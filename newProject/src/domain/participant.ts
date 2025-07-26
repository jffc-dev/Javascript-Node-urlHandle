import { Resource } from './resource';

interface ParticipantProps {
  id: number;
  uuid: string;
  name: string;
  resourceParticipants: Resource[];
  createdAt: Date;
  updatedAt: Date | null;
}

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

  public get updatedAt(): Date | null {
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

  //generate a constructor with all properties
  constructor(input: ParticipantProps) {
    this._id = input.id;
    this._uuid = input.uuid;
    this._name = input.name;
    this._resourceParticipants = input.resourceParticipants;
    this._createdAt = input.createdAt;
    this._updatedAt = input.updatedAt;
  }

  private _id: number;
  private _uuid: string;
  private _name: string;
  private _resourceParticipants: Resource[];
  private _createdAt: Date;
  private _updatedAt: Date | null;
}
