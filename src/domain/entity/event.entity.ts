import { CustomError } from '../errors/custom-error';

export class EventEntity {
  constructor(
    public id: string,
    public title: string,
    public start: Date,
    public end: Date,
    public user: Object,
    public notes?: string | null
  ) {}

  public static fromObject(object: { [key: string]: any }): EventEntity {
    const { id, _id, title, start, end, user, notes } = object;

    if (!id && _id) throw CustomError.badRequest('Id property is required');
    if (!title) throw CustomError.badRequest('Title property is required');
    if (!start) throw CustomError.badRequest('Start property is required');
    if (!end) throw CustomError.badRequest('End property is required');
    if (!user) throw CustomError.badRequest('User property is required');

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

    return new EventEntity(_id || id, title, start, end, user, notes);
  }
}
