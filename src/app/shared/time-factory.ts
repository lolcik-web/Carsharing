import { TimeFormat } from './time';

export class TimeFactory {
  static makeTimeFormatStaions(): TimeFormat[] {
    throw new Error('Method not implemented.');
  }
  static makeTimeFormatSingleStaion(): TimeFormat[] {
    throw new Error('Method not implemented.');
  }

  public makeTimeFormatSingleStaion(): TimeFormat[] {
    let ret = [
      { "name": '1 hour', "value": '3600'},
      { "name": '2 hours', "value": '7200'},
      { "name": '4 hours', "value": '14400'},
      { "name": '6 hours', "value": '21600'},
      { "name": '12 hours', "value": '43200'},
      { "name": '24 hours', "value": '86400'},
      { "name": '2 days', "value": '172800'},
      { "name": '4 days', "value": '345600'},
      { "name": '8 days', "value": '691200'},
    ]
    return ret;
  }

  public makeTimeFormatStaions(): TimeFormat[] {
    let ret = [
      { "name": '1 hour', "value": '3600'},
      { "name": '2 hours', "value": '7200'},
      { "name": '4 hours', "value": '14400'},
      { "name": '6 hours', "value": '21600'},
      { "name": '12 hours', "value": '43200'},
      { "name": '24 hours', "value": '86400'},
      { "name": '2 days', "value": '172800'},
    ]
    return ret;
  }
}
