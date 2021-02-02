import React, {memo} from 'react';

import {Container} from './styles';

const Divider = ({color}) => <Container color={color} />;

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.color === nextProps.color;

export default memo(Divider, arePropsEqual);
