import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.black};
`;

export const InformationContainer = styled.View`
  padding: 16px;
  align-items: flex-start;
`;

export const InformationTitle = styled.Text`
  font-family: SourceSansPro-Bold;
  font-size: 11px;
  letter-spacing: 1.5px;
  color: ${({theme}) => theme.white_with_opacity_of_60};
  text-transform: uppercase;
`;

export const InformationDescription = styled.Text`
  font-family: SourceSansPro-Regular;
  font-size: 17px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.white};
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
  font-size: 17px;
  letter-spacing: 0.5px;
  color: ${({color, theme}) => color ?? theme.white};
`;

export const SettingsActionDescription = styled.Text`
  font-family: SourceSansPro-Regular;
  font-size: 13px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.white_with_opacity_of_60};
  margin-top: 4px;
`;
