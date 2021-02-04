import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';

import {useMessages} from 'src/contexts';

import {Toolbar, PressableIcon, Message} from 'src/components';

import {
  Container,
  TextInputContainer,
  TextInput,
  TextInputActions,
  TextInputActionIconSpace,
} from './styles';

const Chat = () => {
  const {gray} = useTheme();
  const {navigate} = useNavigation();
  const {messages, create} = useMessages();

  const [content, setContent] = useState('');

  const navigateToSettings = useCallback(() => navigate('SettingsScreen'), [
    navigate,
  ]);

  const handleSubmitMessage = useCallback(() => {
    if (!content) return;
    create(content);
    setContent('');
  }, [content, create]);

  const renderItem = useCallback(
    ({item}) => (
      <Message
        authorId={item.author_id}
        content={item.content}
        timestamps={item.timestamps}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item) => item.uuid, []);

  return (
    <Container>
      <Toolbar
        title="Chatting"
        description="Lorem Ipsum, Dolor Sigmed, Igmum Sapien"
        rightIcon="settings"
        onPressRightIcon={navigateToSettings}
      />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <TextInputContainer>
        <TextInput
          placeholder="Say something..."
          placeholderTextColor={gray}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <TextInputActions>
          <PressableIcon name="smile" onPress={() => {}} />
          <TextInputActionIconSpace />
          <PressableIcon name="send" onPress={handleSubmitMessage} />
        </TextInputActions>
      </TextInputContainer>
    </Container>
  );
};

export default Chat;
