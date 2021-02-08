import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKENS} from 'src/constants/storage';

export const apiService = axios.create({
  baseURL: 'https://guarded-sands-64792.herokuapp.com',
});

apiService.interceptors.request.use(async (config) => {
  const authorization = await AsyncStorage.getItem(TOKENS.USER_UUID);
  return {...config, headers: {...config.headers, authorization}};
});
