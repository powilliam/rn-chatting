import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components';

import {DEFAULT_ICON_SIZE, DEFAULT_HIT_SLOP} from '../../constants/touchables';

const PressableIcon = ({name, onPress}) => {
  const {white} = useTheme();
  return (
    <TouchableOpacity onPress={onPress} hitSlop={DEFAULT_HIT_SLOP}>
      <FeatherIcons name={name} size={DEFAULT_ICON_SIZE} color={white} />
    </TouchableOpacity>
  );
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.name === nextProps.name;

export default memo(PressableIcon, arePropsEqual);
