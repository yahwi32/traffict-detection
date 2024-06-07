import { UserType } from '../type';

export const APP_CONFIG: UserType = {
  username: process.env.REACT_APP_USERNAME ?? 'Admin',
  password: process.env.REACT_APP_PASSWORD ?? 'admin',
};
