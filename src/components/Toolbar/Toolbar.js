import React, {memo} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from 'styled-components';

import {useSynchronization} from 'src/contexts';

import {PressableIcon} from '../PressableIcon';

import {
  Container,
  EmptySpace,
  Content,
  Title,
  StatusContainer,
  StatusMessage,
} from './styles';

const Toolbar = ({
  title,
  leftIcon,
  onPressLeftIcon,
  rightIcon,
  onPressRightIcon,
}) => {
  const {isInternetReachable} = useNetInfo();
  const {isSynchronizing} = useSynchronization();
  const {red, yellow} = useTheme();

  return (
    <>
      {!isInternetReachable && (
        <StatusContainer backgroundColor={red}>
          <StatusMessage>Waiting connenction to sync...</StatusMessage>
        </StatusContainer>
      )}

      {isSynchronizing && (
        <StatusContainer backgroundColor={yellow}>
          <StatusMessage>Synchronizing....</StatusMessage>
        </StatusContainer>
      )}

      <Container>
        {leftIcon ? (
          <PressableIcon name={leftIcon} onPress={onPressLeftIcon} />
        ) : (
          <EmptySpace />
        )}
        <Content>
          <Title>{title}</Title>
        </Content>
        {rightIcon ? (
          <PressableIcon name={rightIcon} onPress={onPressRightIcon} />
        ) : (
          <EmptySpace />
        )}
      </Container>
    </>
  );
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title &&
  prevProps.leftIcon === nextProps.leftIcon &&
  prevProps.rightIcon === nextProps.rightIcon;

export default memo(Toolbar, arePropsEqual);
