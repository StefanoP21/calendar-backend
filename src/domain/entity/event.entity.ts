interface Object {
  id: string;
  title: string;
  start: Date;
  end: Date;
  user: Object;
  notes?: string;
}

export class EventEntity {
  constructor(
    public id: string,
    public title: string,
    public start: Date,
    public end: Date,
    public user: Object,
    public notes?: string
  ) {}

  public static fromObject(object: Object): EventEntity {
    const { id, title, start, end, user, notes } = object;
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

    return new EventEntity(id, title, start, end, user, notes);
  }
}
