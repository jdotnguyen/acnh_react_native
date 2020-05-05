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
import ListScreen from './screens/ListScreen';
import ListDetailsScreen from './screens/ListDetailsScreen';
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
            <Stack.Screen name="Fish" component={ListScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Details" component={ListDetailsScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Bugs" component={ListScreen} options={getHeaderStyles()} />
            <Stack.Screen name="Villagers" component={ListScreen} options={getHeaderStyles()} />
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
        height: 120,
        shadowOpacity: 0,
        shadowRadius: 4,
        shadowColor: '#404040',
        shadowOffset: { height: 0, width: 0 },
    },
    headerTitleStyle: {
        color: '#909090',
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'animal-crossing'
    },
    headerBackTitle: 'Back',
    headerBackTitleStyle: {
        fontSize: 20,
        fontFamily: 'animal-crossing'
    }
  }
}