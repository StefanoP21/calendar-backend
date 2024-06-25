export class UpdateEventDto {
  private constructor(
    public readonly title?: string,
    public readonly start?: Date,
    public readonly end?: Date,
    public readonly notes?: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.title) returnObj.title = this.title;
    if (this.start) returnObj.start = this.start;
    if (this.end) returnObj.end = this.end;
    if (this.notes) returnObj.notes = this.notes;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateEventDto?] {
    const { title, start, end, notes } = props;
    let newStart = start;
    let newEnd = end;

    if (start) {
      newStart = new Date(start);

      if (newStart.toString() === 'Invalid Date') {
        return ['Start must be a vaild date'];
      }
    }

    if (end) {
      newEnd = new Date(end);

      if (newEnd.toString() === 'Invalid Date') {
        return ['End must be a vaild date'];
      }
    }

    return [undefined, new UpdateEventDto(title, start, end, notes)];
  }
}
