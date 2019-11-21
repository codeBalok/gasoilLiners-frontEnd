import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  public parseDate(date: string): string {
    return new Date(date).getDate() + '/' + this.monthNames[new Date(date).getMonth()] +
    '/' + new Date(date).getFullYear().toString().substr(-2);
  }
}
