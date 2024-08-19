import { User } from '@/models';

export function userAdapter(data: any): User {
  return {
    token: data.token,
    account: {
      id: data.account.id,
      username: data.account.user,
      photo: data.account.photo,
      email: data.account.email
    },
    person: {
      id: data.person.id,
      name: data.person.name,
      phone: data.person.phone,
      address: data.person.address
    },
    role: {
      id: data.role.id,
      name: data.role.role_name
    }
  };
}
