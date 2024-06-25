export class CreateEventDto {
  private constructor(
    public readonly title: string,
    public readonly start: Date,
    public readonly end: Date,
    public readonly user: Object,
    public readonly notes?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateEventDto?] {
    const { title, start, end, user, notes } = props;

    if (!title) return ['Title property is required', undefined];
    if (!start) return ['start property is required', undefined];
    if (!end) return ['end property is required', undefined];

    return [undefined, new CreateEventDto(title, start, end, user, notes)];
  }
}
