import { Rating } from './rating';

export class User {
  private _id: number;
  private _uuid: string;
  private _email: string;
  private _name: string;
  private _lastName: string;
  private _phoneNumber?: string;
  private _password?: string;
  private _address?: string;
  private _resetPasswordToken?: string;
  private _isActive?: boolean;
  private _resetPasswordExpiresAt?: Date;
  private _ratings: Rating[];
  private _createdAt?: Date;
  private _updatedAt?: Date;
}
