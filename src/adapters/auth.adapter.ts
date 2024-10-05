import { AuthState } from '@/models';

export function authAdapter(data: any): AuthState {
  return {
    isAuthenticated: true,
    token: data.token,
    account: data.account
  };
}
