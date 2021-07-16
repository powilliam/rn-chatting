import {apiService} from 'src/providers';

export const postMessage = async (message) =>
  await apiService.post('/v1/messages', message);
