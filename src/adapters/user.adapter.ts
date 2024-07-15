import { User } from '@/models';

export function userAdapter(data: any): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
}
