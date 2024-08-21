import { User } from '@/models';

export function userAdapter(data: any): User {
  return {
    token: data.token,
    account: {
      id: data.session.account.account_id,
      username: data.session.account.user,
      photo: data.session.account.photo,
      email: data.session.account.email
    },
    person: {
      id: data.session.person.person_id,
      name: data.session.person.name,
      phone: data.session.person.phone,
      address: data.session.person.address
    },
    role: {
      id: data.session.role.role_id,
      name: data.session.role.role_name
    }
  };
}
