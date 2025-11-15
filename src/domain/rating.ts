import { Resource } from './resource';
import { User } from './user';

export class Rating {
  public get id(): number {
    return this._id;
  }

  public get comment(): string {
    return this._comment;
  }

  public get uuid(): string {
    return this._uuid;
  }

  public get userId(): number {
    return this._userId;
  }

  public get resourceId(): number {
    return this._resourceId;
  }

  public get score(): number {
    return this._score;
  }

  public get user(): User {
    return this._user;
  }

  public get resource(): Resource {
    return this._resource;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set uuid(value: string) {
    this._uuid = value;
  }

  public set userId(value: number) {
    this._userId = value;
  }

  public set comment(value: string) {
    this._comment = value;
  }

  public set resourceId(value: number) {
    this._resourceId = value;
  }

  public set score(value: number) {
    this._score = value;
  }

  public set user(value: User) {
    this._user = value;
  }

  public set resource(value: Resource) {
    this._resource = value;
  }

  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  private _id: number;
  private _uuid: string;
  private _userId: number;
  private _resourceId: number;
  private _score: number;
  private _comment: string;
  private _user: User;
  private _resource: Resource;
  private _createdAt: Date;
  private _updatedAt: Date;
}
