import { Flag } from './flag';
import { Participant } from './participant';
import { Rating } from './rating';

type ResourceStatus = 'PENDING' | 'APPROVED' | 'DELETED';

interface ResourceProps {
  id: number;
  uuid: string;
  title: string;
  url: string;
  status: ResourceStatus;
  parentId: number | null;
  parent: Resource | null;
  children: Resource[];
  flags: Flag[];
  participants: Participant[];
  ratings: Rating[];
  participantIds: number[];
  createdAt: Date;
  updatedAt: Date | null;
}

export class Resource {
  public get id(): number {
    return this._id;
  }

  public get uuid(): string {
    return this._uuid;
  }

  public get title(): string {
    return this._title;
  }

  public get url(): string {
    return this._url;
  }

  public get status(): ResourceStatus {
    return this._status;
  }

  public get parent(): Resource | null {
    return this._parent;
  }

  public get children(): Resource[] {
    return this._children;
  }

  public get flags(): Flag[] {
    return this._flags;
  }

  public get participants(): Participant[] {
    return this._participants;
  }

  public get ratings(): Rating[] {
    return this._ratings;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date | null {
    return this._updatedAt;
  }

  public get participantIds(): number[] {
    return this._participantIds;
  }

  public get parentId(): number | null {
    return this._parentId;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set uuid(value: string) {
    this._uuid = value;
  }

  public set title(value: string) {
    this._title = value;
  }

  public set url(value: string) {
    this._url = value;
  }

  public set status(value: ResourceStatus) {
    this._status = value;
  }

  public set parent(value: Resource) {
    this._parent = value;
  }

  public set children(value: Resource[]) {
    this._children = value;
  }

  public set flags(value: Flag[]) {
    this._flags = value;
  }

  public set participants(value: Participant[]) {
    this._participants = value;
  }

  public set ratings(value: Rating[]) {
    this._ratings = value;
  }

  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public set participantIds(value: number[]) {
    this._participantIds = value;
  }

  public set parentId(value: number | null) {
    this._parentId = value;
  }

  constructor(input: ResourceProps) {
    this._id = input.id;
    this._uuid = input.uuid;
    this._title = input.title;
    this._url = input.url;
    this._status = input.status;
    this._parent = input.parent;
    this._children = input.children;
    this._flags = input.flags;
    this._participants = input.participants;
    this._parentId = input.parentId;
    this._ratings = input.ratings;
    this._participantIds = input.participantIds;
    this._createdAt = input.createdAt;
    this._updatedAt = input.updatedAt;
  }

  private _id: number;
  private _uuid: string;
  private _title: string;
  private _url: string;
  private _status: ResourceStatus;
  private _parent: Resource | null;
  private _parentId: number | null;
  private _children: Resource[];
  private _flags: Flag[];
  private _participants: Participant[];
  private _ratings: Rating[];
  private _participantIds: number[];
  private _createdAt: Date;
  private _updatedAt: Date | null;
}
