export abstract class Entity<Props> {
  protected props: Props;

  protected constructor(props: Props) {
    this.props = props;
  }

  public getProps() {
    return this.props;
  }
}
