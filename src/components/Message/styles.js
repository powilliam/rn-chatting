import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 4px 8px;
  align-items: ${({aligment}) => aligment};
`;

export const Timestamp = styled.Text`
  font-family: SourceSansPro-Semibold;
  font-size: 12.8px;
  letter-spacing: 0.4px;
  color: ${({theme}) => theme.gray};
  margin-bottom: 4px;
`;

export const Content = styled.View`
  max-width: 200px;
  padding: 10px 16px;
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor ?? theme.blue};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const Value = styled.Text`
  font-family: SourceSansPro-Regular;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.white};
`;
