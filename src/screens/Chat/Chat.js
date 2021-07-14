import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {DEFAULT_HIT_SLOP} from 'src/constants/touchables';

import {useMessages, useAuth, useRealm, useSynchronization} from 'src/contexts';

import {Toolbar, Message} from 'src/components';

import {
  Container,
  MessageList,
  TextInputContainer,
  TextInput,
  SubmitButton,
} from './styles';

const Chat = () => {
  const {white_with_opacity_of_60, white} = useTheme();
  const {navigate} = useNavigation();
  const {messages, create} = useMessages();
  const {user} = useAuth();
  const {isSynchronizing} = useSynchronization();
  const realm = useRealm();
  const flatlistRef = useRef();

  const [content, setContent] = useState('');

  const canSubmitMessages = useMemo(() => !!user, [user]);

  const navigateToSettings = useCallback(() => navigate('SettingsScreen'), [
    navigate,
  ]);

  const handleSubmitMessage = useCallback(async () => {
    if (!content) return;
    const contentRef = content;
    setContent('');
    await create(contentRef);
  }, [content, create]);

  const renderItem = useCallback(
    ({item: message}) => (
      <Message
        authorUuid={message.author_uuid}
        authorName={message.author_name}
        content={message.content}
        timestamps={message.timestamps}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((message) => message.uuid, []);

  useEffect(() => {
    if (!realm || !flatlistRef.current) return;
    const messageObjects = realm.objects('Message');
    messageObjects.addListener(() => {
      setTimeout(() => {
        flatlistRef.current.scrollToEnd([true]);
      }, 100);
    });
    return () => messageObjects.removeAllListeners();
  }, [realm, flatlistRef]);

  useEffect(() => {
    if (!flatlistRef.current) return;
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      flatlistRef.current.scrollToEnd([true]);
    });
    return () => keyboardDidShow.remove();
  }, [flatlistRef]);

  useEffect(() => {
    if (!flatlistRef.current || isSynchronizing) return;
    flatlistRef.current.scrollToEnd([true]);
  }, [flatlistRef, isSynchronizing]);

  return (
    <Container>
      <Toolbar rightIcon="settings" onPressRightIcon={navigateToSettings} />

      <MessageList
        ref={flatlistRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      {canSubmitMessages && (
        <TextInputContainer>
          <TextInput
            placeholder="Say something..."
            placeholderTextColor={white_with_opacity_of_60}
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
          />

          <SubmitButton
            onPress={handleSubmitMessage}
            hitSlop={DEFAULT_HIT_SLOP}>
            <Ionicons name="send-sharp" size={18} color={white} />
          </SubmitButton>
        </TextInputContainer>
      )}
    </Container>
  );
};

export default Chat;
