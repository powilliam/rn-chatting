import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import FeatherIcons from 'react-native-vector-icons/Feather';

import {Toolbar, Divider} from '../../components';

import {DEFAULT_ICON_SIZE, DEFAULT_HIT_STOP} from '../../constants/touchables';

import {
  Container,
  InformationContainer,
  InformationTitle,
  InformationDescription,
  SettingsAction,
  SettingsActionTitle,
  SettingsActionDescription,
} from './styles';

const Settings = () => {
  const {goBack} = useNavigation();
  const {white_of_opacity_of_12, red, white} = useTheme();

  return (
    <Container>
      <Toolbar
        title="Settings"
        leftIcon="chevron-left"
        onPressLeftIcon={goBack}
      />
      <InformationContainer>
        <InformationTitle>display name</InformationTitle>
        <InformationDescription>Lorem Ipsum</InformationDescription>
      </InformationContainer>
      <InformationContainer>
        <InformationTitle>unique identifier</InformationTitle>
        <InformationDescription>
          123e4567-e89b-12d3-a456-426614174000
        </InformationDescription>
      </InformationContainer>
      <InformationContainer>
        <InformationTitle>last synchronization</InformationTitle>
        <InformationDescription>32 minutes ago</InformationDescription>
      </InformationContainer>
      <Divider color={white_of_opacity_of_12} />
      <TouchableOpacity onPress={() => {}} hitSlop={DEFAULT_HIT_STOP}>
        <SettingsAction>
          <View>
            <SettingsActionTitle color={red}>
              Delete all messages
            </SettingsActionTitle>
            <SettingsActionDescription>
              You won’t be able to recovery any data
            </SettingsActionDescription>
          </View>
          <FeatherIcons name="trash" size={DEFAULT_ICON_SIZE} color={white} />
        </SettingsAction>
      </TouchableOpacity>
    </Container>
  );
};

export default Settings;
