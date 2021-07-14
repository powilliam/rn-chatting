import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKENS} from 'src/constants/storage';

export const getAuthenticated = async () => {
  const [[, name], [, uuid]] = await AsyncStorage.multiGet([
    TOKENS.USERNAME,
    TOKENS.USER_UUID,
  ]);
  return !!name && !!uuid && {name, uuid};
};

export const setAuthenticated = async ({name, uuid}) => {
  await AsyncStorage.multiSet([
    [TOKENS.USERNAME, name],
    [TOKENS.USER_UUID, uuid],
  ]);
};
