import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.black};
`;

export const MessagesContainer = styled.View`
  flex: 1;
`;

export const TextInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  height: 56px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: SourceSansPro-Regular;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.white};
  margin-right: 24px;
`;

export const TextInputActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextInputActionIconSpace = styled.View`
  width: 16px;
  height: 16px;
`;
