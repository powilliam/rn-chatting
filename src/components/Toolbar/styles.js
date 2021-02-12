import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  padding: 16px;
  height: 56px;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
`;

export const EmptySpace = styled.View`
  width: 24px;
  height: 24px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: SourceSansPro-Bold;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.white};
`;

export const StatusContainer = styled.View`
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor ?? theme.black};
`;

export const StatusMessage = styled.Text`
  font-size: 11px;
  font-family: SourceSansPro-Semibold;
  letter-spacing: 1.5px;
  color: ${({theme}) => theme.white};
  text-transform: uppercase;
`;
