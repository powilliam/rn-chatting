import styled from 'styled-components/native';

export const Container = styled.View`
  height: 1px;
  background-color: ${({color, theme}) => color ?? theme.white_with_opacity};
`;
