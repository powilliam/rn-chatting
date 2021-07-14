import {apiService} from 'src/providers';

export const signup = async () => await apiService.post('/v1/users/signup');
