export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  account: string | null;
}
