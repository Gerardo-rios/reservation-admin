import { User } from '@/models';
import { loadAbort } from '../utilities/load-abort-axios.utility';
import { api } from '../services';

export const register = (
  name: string,
  phone: string,
  address: string,
  role_name: string,
  email: string,
  password: string,
  user: string,
  photo: string
) => {
  const controller = loadAbort();
  return {
    call: api.post<User>(
      '/account/register',
      {
        name: name,
        phone: phone,
        address: address,
        role_name: role_name,
        email: email,
        password: password,
        user: user,
        photo: photo
      },
      { signal: controller.signal }
    ),
    controller
  };
};

export const login = (email: string, password: string) => {
  const controller = loadAbort();
  return { call: api.post<User>('/account/login', { email: email, password: password }, { signal: controller.signal }), controller };
};
