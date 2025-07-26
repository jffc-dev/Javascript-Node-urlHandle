import { Resource } from './resource';

export class Participant {
  public get id(): number {
    return this._id;
  }

  public get uuid(): string {
    return this._uuid;
  }

  public get name(): string {
    return this._name;
  }

  public get resourceParticipants(): Resource[] {
    return this._resourceParticipants;
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

  public set name(value: string) {
    this._name = value;
  }

  public set resourceParticipants(value: Resource[]) {
    this._resourceParticipants = value;
  }

  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  private _id: number;
  private _uuid: string;
  private _name: string;
  private _resourceParticipants: Resource[];
  private _createdAt: Date;
  private _updatedAt: Date;
}
