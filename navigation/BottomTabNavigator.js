import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FishScreen from '../screens/FishScreen';
import BugsScreen from '../screens/BugsScreen';
import VillagersScreen from '../screens/VillagersScreen';
import MusicScreen from '../screens/MusicScreen';

const BottomTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Nook Phone';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} barStyle={{ display: 'block' }}>
      <BottomTab.Screen
        name="Nook Phone"
        component={HomeScreen}
        options={{
          title: 'Nook Phone',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
      />
      <BottomTab.Screen
        name="Fish"
        component={FishScreen}
        options={{
          title: 'Fish',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="fish" />,
        }}
      />
      <BottomTab.Screen
        name="Bugs"
        component={BugsScreen}
        options={{
          title: 'Bugs',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="bug" />,
        }}
      />
      <BottomTab.Screen
        name="Villagers"
        component={VillagersScreen}
        options={{
          title: 'Villagers',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="users" />,
        }}
      />
      <BottomTab.Screen
        name="Music"
        component={MusicScreen}
        options={{
          title: 'Music',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="music" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  return routeName;
}
