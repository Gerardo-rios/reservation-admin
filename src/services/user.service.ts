import { User } from '@/models';
import { loadAbort } from '@/utilities';
import { api } from '@/services';

export const login = () => {
  const controller = loadAbort();
  return {
    call: api.get<User>('/character/2', { signal: controller.signal }),
    controller
  };
};

export const getMorty = () => {
  return api.get<User>('/character/2');
};

export const getRick = () => {
  return api.get<User>('/character/1');
};

export const getCoolMorty = () => {
  const controller = loadAbort();
  return { call: api.get<User>('/character/2', { signal: controller.signal }), controller };
};

export const getCoolRick = () => {
  const controller = loadAbort();
  return { call: api.get<User>('/character/1', { signal: controller.signal }), controller };
};
