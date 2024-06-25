export class EventEntity {
  constructor(
    public title: string,
    public start: Date,
    public end: Date,
    public user: Object,
    public notes?: string | null
  ) {}

  public static fromObject(object: { [key: string]: any }): EventEntity {
    const { title, start, end, user, notes = '' } = object;
    let newStart;
    let newEnd;

    if (start) {
      newStart = new Date(start);

      if (isNaN(newStart.getTime())) {
        throw 'Start is not a valid date';
      }
    }

    if (end) {
      newEnd = new Date(end);

      if (isNaN(newEnd.getTime())) {
        throw 'End is not a valid date';
      }
    }

    return new EventEntity(title, start, end, user, notes);
  }
}
