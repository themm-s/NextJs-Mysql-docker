export type TUser = {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  salt: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_admin: boolean;
};