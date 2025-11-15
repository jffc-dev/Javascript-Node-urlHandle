import { Resource } from './resource';

interface ParticipantProps {
  id: number;
  uuid: string;
  name: string;
  resources: Resource[];
  resourceIds: number[];
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

  public get resources(): Resource[] {
    return this._resources;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date | null {
    return this._updatedAt;
  }

  public get resourceIds(): number[] {
    return this._resourceIds;
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

  public set resources(value: Resource[]) {
    this._resources = value;
  }

  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public set resourceIds(value: number[]) {
    this._resourceIds = value;
  }

  //generate a constructor with all properties
  constructor(input: ParticipantProps) {
    this._id = input.id;
    this._uuid = input.uuid;
    this._name = input.name;
    this._resources = input.resources;
    this._resourceIds = input.resourceIds;
    this._createdAt = input.createdAt;
    this._updatedAt = input.updatedAt;
  }

  private _id: number;
  private _uuid: string;
  private _name: string;
  private _resources: Resource[];
  private _resourceIds: number[];
  private _createdAt: Date;
  private _updatedAt: Date | null;
}
