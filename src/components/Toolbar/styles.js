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
  font-size: 16px;
  font-family: SourceSansPro-SemiBold;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.white};
`;

export const Description = styled.Text`
  width: 166px;
  margin-top: 2px;
  font-size: 12.8px;
  font-family: SourceSansPro-Regular;
  letter-spacing: 0.4px;
  color: ${({theme}) => theme.gray};
`;
