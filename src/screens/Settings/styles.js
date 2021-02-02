import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.black};
`;

export const InformationContainer = styled.View`
  padding: 16px;
  align-items: flex-start;
`;

export const InformationTitle = styled.Text`
  font-family: SourceSansPro-SemiBold;
  font-size: 12.8px;
  letter-spacing: 0.4px;
  color: ${(props) => props.theme.gray};
  text-transform: uppercase;
`;

export const InformationDescription = styled.Text`
  font-family: SourceSansPro-Regular;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.white};
  margin-top: 4px;
`;

export const SettingsAction = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SettingsActionTitle = styled.Text`
  font-family: SourceSansPro-SemiBold;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${(props) => props.color ?? props.theme.white};
`;

export const SettingsActionDescription = styled.Text`
  font-family: SourceSansPro-Regular;
  font-size: 12.8px;
  letter-spacing: 0.4px;
  color: ${(props) => props.theme.gray};
  margin-top: 4px;
`;
