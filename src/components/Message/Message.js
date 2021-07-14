import React, {memo, useMemo} from 'react';
import {format} from 'date-fns';
import {useTheme} from 'styled-components';

import {useAuth} from 'src/contexts';

import {Container, Timestamp, Content, Value} from './styles';

const Message = ({authorUuid, authorName, content, timestamps}) => {
  const {user} = useAuth();
  const {blue, black_variant} = useTheme();

  const isFromCurrentUser = useMemo(() => authorUuid === user.uuid, [
    authorUuid,
    user,
  ]);

  const aligment = useMemo(
    () => (isFromCurrentUser ? 'flex-end' : 'flex-start'),
    [isFromCurrentUser],
  );

  const backgroundColor = useMemo(
    () => (isFromCurrentUser ? blue : black_variant),
    [isFromCurrentUser, blue, black_variant],
  );

  const formatedTimestamp = useMemo(() => {
    const time = format(timestamps, 'p');
    return isFromCurrentUser ? time : `${time} - ${authorName}`;
  }, [timestamps, authorName, isFromCurrentUser]);

  return (
    <Container aligment={aligment}>
      <Timestamp>{formatedTimestamp}</Timestamp>
      <Content backgroundColor={backgroundColor}>
        <Value>{content}</Value>
      </Content>
    </Container>
  );
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.content === nextProps.content &&
  prevProps.authorUuid === nextProps.authorUuid &&
  prevProps.authorName === nextProps.authorName &&
  prevProps.timestamps === nextProps.timestamps;

export default memo(Message, arePropsEqual);
