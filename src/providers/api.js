import axios from 'axios';

import {getAuthenticated} from 'src/utils';

export const apiService = axios.create({
  baseURL: 'https://guarded-sands-64792.herokuapp.com',
});

apiService.interceptors.request.use(async (config) => {
  const authenticated = await getAuthenticated();
  return {
    ...config,
    headers: {
      ...config.headers,
      ...(authenticated && {authorization: authenticated.uuid}),
    },
  };
});
