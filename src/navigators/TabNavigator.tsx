import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AppBar from '../components/AppBar';
import AppTabBar from '../components/AppTabBar';
import ChatsScreen from '../screens/ChatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatusScreen from '../screens/StatusScreen';
import type {TabParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

// @refresh reset
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={AppTabBar}
      screenOptions={{
        // eslint-disable-next-line react/no-unstable-nested-components
        header: props => <AppBar {...props} />,
      }}
      initialRouteName="Chats">
      {/* Note that we use the option tabBarLabel as a material icon name */}
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{tabBarLabel: 'person'}}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{tabBarLabel: 'chat'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarLabel: 'settings'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
