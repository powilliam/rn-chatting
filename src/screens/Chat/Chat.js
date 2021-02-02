import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';

import {Toolbar, PressableIcon, Divider} from '../../components';

import {
  Container,
  MessagesContainer,
  TextInputContainer,
  TextInput,
  TextInputActions,
  TextInputActionIconSpace,
} from './styles';

const Chat = () => {
  const {gray} = useTheme();
  const {navigate} = useNavigation();

  const navigateToSettings = useCallback(() => navigate('SettingsScreen'), [
    navigate,
  ]);

  return (
    <Container>
      <Toolbar
        title="Chatting"
        description="Lorem Ipsum, Dolor Sigmed, Igmum Sapien"
        rightIcon="settings"
        onPressRightIcon={navigateToSettings}
      />
      <MessagesContainer />
      <View>
        <Divider />
        <TextInputContainer>
          <TextInput
            placeholder="Say something..."
            placeholderTextColor={gray}
          />
          <TextInputActions>
            <PressableIcon name="smile" onPress={() => {}} />
            <TextInputActionIconSpace />
            <PressableIcon name="send" onPress={() => {}} />
          </TextInputActions>
        </TextInputContainer>
      </View>
    </Container>
  );
};

export default Chat;
