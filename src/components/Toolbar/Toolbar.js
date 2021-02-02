import React, {memo} from 'react';

import {PressableIcon} from '../PressableIcon';

import {Container, EmptySpace, Content, Title, Description} from './styles';

const Toolbar = ({
  title,
  description,
  leftIcon,
  onPressLeftIcon,
  rightIcon,
  onPressRightIcon,
  children,
}) => (
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
    {children}
  </>
);

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title &&
  prevProps.description === nextProps.description &&
  prevProps.leftIcon === nextProps.leftIcon &&
  prevProps.rightIcon === nextProps.rightIcon;

export default memo(Toolbar, arePropsEqual);
