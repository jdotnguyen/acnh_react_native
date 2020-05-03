import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useLinking from './navigation/useLinking';

// Screens
import HomeScreen from './screens/HomeScreen';
import FishScreen from './screens/FishScreen';
import FishDetailsScreen from './screens/FishDetailsScreen';
import BugsScreen from './screens/BugsScreen';
import VillagersScreen from './screens/VillagersScreen';
import MusicScreen from './screens/MusicScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome5.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'animal-crossing': require('./assets/fonts/AnimalCrossing.ttf')
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Nook Phone" component={HomeScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Fish" component={FishScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Fish Details" component={FishDetailsScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Bugs" component={BugsScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Villagers" component={VillagersScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Music" component={MusicScreen} options={getHeaderStyles()} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const getHeaderStyles = () => {
  return {
    headerStyle: {
      backgroundColor: '#fff',
      height: 100
    },
    headerTitleStyle: {
      color: '#909090',
      fontWeight: 'bold',
      fontSize: 35,
      fontFamily: 'animal-crossing'
    },
    headerLeftContainerStyle: {
      color: '#909090'
    },
    navigationOptions: {header: ({ goBack }) => ({ left: <Left onPress={goBack} />})}
  }
}