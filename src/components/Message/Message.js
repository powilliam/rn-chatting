import React, {memo, useMemo} from 'react';
import {format} from 'date-fns';

import {useUser} from 'src/contexts';

import {Container, Timestamp, Content, Value} from './styles';

const Message = ({authorUuid, authorName, content, timestamps, status}) => {
  const {uuid} = useUser();

  const aligment = useMemo(
    () => (authorUuid === uuid ? 'flex-end' : 'flex-start'),
    [authorUuid, uuid],
  );

  const formatedTimestamp = useMemo(() => {
    const time = format(timestamps, 'p');
    return authorUuid === uuid
      ? `${status} - ${time}`
      : `${time} - ${authorName}`;
  }, [timestamps, authorName, authorUuid, uuid, status]);

  return (
    <Container aligment={aligment}>
      <Timestamp>{formatedTimestamp}</Timestamp>
      <Content>
        <Value>{content}</Value>
      </Content>
    </Container>
  );
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.value === nextProps.value &&
  prevProps.authorUuid === nextProps.authorUuid &&
  prevProps.authorName === nextProps.authorName &&
  prevProps.status === nextProps.status &&
  prevProps.timestamps === nextProps.timestamps;

export default memo(Message, arePropsEqual);
