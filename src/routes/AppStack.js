import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';

import {ChatScreen, SettingsScreen} from 'src/screens';

import {darkTheme} from 'src/styles/themes';

const {Navigator, Screen} = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: darkTheme.black},
  ...TransitionPresets.SlideFromRightIOS,
  ...TransitionSpecs.TransitionIOSSpec,
};

const AppStack = () => (
  <Navigator screenOptions={screenOptions}>
    <Screen name="ChatScreen" component={ChatScreen} />
    <Screen name="SettingsScreen" component={SettingsScreen} />
  </Navigator>
);

export default AppStack;
