import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';

import {ChatScreen, SettingsScreen} from '../screens';

import {darkTheme} from '../styles/themes';

const {Navigator, Screen} = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: darkTheme.black},
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  ...TransitionSpecs.TransitionIOSSpec,
};

const AppStack = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="ChatScreen" component={ChatScreen} />
      <Screen name="SettingsScreen" component={SettingsScreen} />
    </Navigator>
  );
};

export default AppStack;
