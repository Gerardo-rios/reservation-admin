import { Account, Person, Role } from '@/types';

export interface User {
  token: string;
  account: Account;
  person: Person;
  role: Role;
}
