import { IIdentifiable } from 'core/types';

export interface IUserModel extends IIdentifiable {
  name: string;
  email: boolean;
}
