import React, {memo, useMemo} from 'react';
import {format} from 'date-fns';

import {useUser} from 'src/contexts';

import {Container, Timestamp, Content, Value} from './styles';

const Message = ({authorId, content, timestamps}) => {
  const {id} = useUser();

  const aligment = useMemo(
    () => (authorId === id ? 'flex-end' : 'flex-start'),
    [authorId, id],
  );

  const formatedTimestamp = useMemo(() => format(timestamps, 'p'), [
    timestamps,
  ]);

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
  prevProps.authorId === nextProps.authorId &&
  prevProps.timestamps === nextProps.timestamps;

export default memo(Message, arePropsEqual);
