export class CreateEventDto {
  private constructor(
    public readonly title: string,
    public readonly start: Date,
    public readonly end: Date,
    public readonly user: Object,
    public readonly notes?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateEventDto?] {
    const { title, start, end, user, notes } = object;

    if (!title) return ['Title property is required', undefined];
    if (!start) return ['Start property is required', undefined];
    if (!end) return ['End property is required', undefined];
    if (!user) return ['User property is required', undefined];

    return [undefined, new CreateEventDto(title, start, end, user, notes)];
  }
}
