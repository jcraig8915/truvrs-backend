export interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  avatar_url?: string;
  role: 'user' | 'admin';
  settings: UserSettings;
}

export interface UserSettings {
  notifications: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export interface UserCreateInput {
  email: string;
  password: string;
  name: string;
  role?: 'user' | 'admin';
  settings?: Partial<UserSettings>;
}

export interface UserUpdateInput {
  name?: string;
  avatar_url?: string;
  settings?: Partial<UserSettings>;
} 