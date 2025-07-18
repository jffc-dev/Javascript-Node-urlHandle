import { Entity } from 'src/application/core/entity';

export interface ResourceProps {
  resourceId: number;
  url: string;
  title: string;
  createdAt: Date;
}

export class Resource extends Entity<ResourceProps> {
  constructor(props: ResourceProps) {
    super(props);
  }

  get resourceId(): number {
    return this.props.resourceId;
  }

  get url(): string {
    return this.props.url;
  }

  get title(): string {
    return this.props.title;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set resourceId(value: number) {
    this.props.resourceId = value;
  }

  set url(value: string) {
    this.props.url = value;
  }

  set title(value: string) {
    this.props.title = value;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }
}
