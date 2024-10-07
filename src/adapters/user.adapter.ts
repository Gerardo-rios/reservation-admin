import { User } from '@/models';

export function userAdapter(data: any): User {
  return {
    account: {
      id: data.account.account_id,
      username: data.account.user,
      photo: data.account.photo,
      email: data.account.email
    },
    person: {
      id: data.person.person_id,
      name: data.person.name,
      phone: data.person.phone,
      address: data.person.address
    },
    role: {
      id: data.role.role_id,
      name: data.role.role_name
    }
  };
}
