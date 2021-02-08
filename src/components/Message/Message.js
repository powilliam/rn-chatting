import React, {memo, useMemo} from 'react';
import {format} from 'date-fns';

import {useUser} from 'src/contexts';

import {Container, Timestamp, Content, Value} from './styles';

const Message = ({authorUuid, authorName, content, timestamps}) => {
  const {uuid} = useUser();

  const aligment = useMemo(
    () => (authorUuid === uuid ? 'flex-end' : 'flex-start'),
    [authorUuid, uuid],
  );

  const formatedTimestamp = useMemo(() => {
    const time = format(timestamps, 'p');
    return authorUuid === uuid ? time : `${time} - ${authorName}`;
  }, [timestamps, authorName, authorUuid, uuid]);

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
  prevProps.timestamps === nextProps.timestamps;

export default memo(Message, arePropsEqual);
