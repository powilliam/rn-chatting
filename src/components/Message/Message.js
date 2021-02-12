import React, {memo, useMemo} from 'react';
import {format} from 'date-fns';
import {useTheme} from 'styled-components';

import {useUser} from 'src/contexts';

import {Container, Timestamp, Content, Value} from './styles';

const Message = ({authorUuid, authorName, content, timestamps}) => {
  const {uuid} = useUser();
  const {blue, black_variant} = useTheme();

  const isFromCurrentUser = useMemo(() => authorUuid === uuid, [
    authorUuid,
    uuid,
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
    return authorUuid === uuid ? time : `${time} - ${authorName}`;
  }, [timestamps, authorName, authorUuid, uuid]);

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
