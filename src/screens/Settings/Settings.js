import React, {useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {format} from 'date-fns';
import FeatherIcons from 'react-native-vector-icons/Feather';

import {useMessages, useUser, useSynchronization} from 'src/contexts';

import {Toolbar, Divider} from 'src/components';

import {DEFAULT_ICON_SIZE, DEFAULT_HIT_SLOP} from 'src/constants/touchables';

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
  const {white_with_opacity_of_12, red, white} = useTheme();
  const {deleteAll} = useMessages();
  const {username, uuid} = useUser();
  const {lastSync} = useSynchronization();

  const memoizedUsername = useMemo(() => username ?? 'UNSIGNED', [username]);
  const memoizedUuid = useMemo(() => uuid ?? 'UNSIGNED', [uuid]);
  const formatedLastSync = useMemo(() => lastSync && format(lastSync, 'p'), [
    lastSync,
  ]);

  return (
    <Container>
      <Toolbar
        title="Settings"
        leftIcon="chevron-left"
        onPressLeftIcon={goBack}
      />

      <InformationContainer>
        <InformationTitle>display name</InformationTitle>
        <InformationDescription>{memoizedUsername}</InformationDescription>
      </InformationContainer>

      <InformationContainer>
        <InformationTitle>unique identifier</InformationTitle>
        <InformationDescription>{memoizedUuid}</InformationDescription>
      </InformationContainer>

      <InformationContainer>
        <InformationTitle>last synchronization</InformationTitle>
        <InformationDescription>{formatedLastSync}</InformationDescription>
      </InformationContainer>

      <Divider color={white_with_opacity_of_12} />

      <TouchableOpacity onPress={deleteAll} hitSlop={DEFAULT_HIT_SLOP}>
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
