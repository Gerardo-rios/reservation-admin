import { Account, Person, Role } from '@/types';

export interface User {
  token: string | null;
  account: Account;
  person: Person;
  role: Role;
}
