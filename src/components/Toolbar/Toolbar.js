import React, {memo} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

import {useSynchronization} from 'src/contexts';

import {PressableIcon} from '../PressableIcon';

import {
  Container,
  EmptySpace,
  Content,
  Title,
  Description,
  StatusContainer,
  StatusMessage,
} from './styles';

const Toolbar = ({
  title,
  description,
  leftIcon,
  onPressLeftIcon,
  rightIcon,
  onPressRightIcon,
}) => {
  const {isConnected} = useNetInfo();
  const {isSynchronizing} = useSynchronization();

  return (
    <>
      <Container>
        {leftIcon ? (
          <PressableIcon name={leftIcon} onPress={onPressLeftIcon} />
        ) : (
          <EmptySpace />
        )}
        <Content>
          <Title>{title}</Title>
          {description && (
            <Description numberOfLines={1}>{description}</Description>
          )}
        </Content>
        {rightIcon ? (
          <PressableIcon name={rightIcon} onPress={onPressRightIcon} />
        ) : (
          <EmptySpace />
        )}
      </Container>

      <StatusContainer>
        {!isConnected && (
          <StatusMessage red>
            you’re offline. Waiting connection to sync...
          </StatusMessage>
        )}
        {isSynchronizing && <StatusMessage>synchronizing</StatusMessage>}
      </StatusContainer>
    </>
  );
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title &&
  prevProps.description === nextProps.description &&
  prevProps.leftIcon === nextProps.leftIcon &&
  prevProps.rightIcon === nextProps.rightIcon;

export default memo(Toolbar, arePropsEqual);
