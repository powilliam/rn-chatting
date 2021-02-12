import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-grow: 1;
  background-color: ${({theme}) => theme.black};
`;

export const MessageList = styled.FlatList`
  flex: 1;
`;

export const TextInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px 14px;
  min-height: 56px;
  max-height: 160px;
  border-width: 1px;
  border-color: ${({theme}) => theme.black_variant};
  border-radius: 32px;
  margin: 6px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: SourceSansPro-Regular;
  font-size: 17px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.white};
  margin-right: 24px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  padding: 12px;
  background-color: ${({theme}) => theme.blue};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
