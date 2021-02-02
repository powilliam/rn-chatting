import styled from 'styled-components/native';

export const Container = styled.View`
  height: 1px;
  background-color: ${(props) => props.color ?? props.theme.white_with_opacity};
`;
