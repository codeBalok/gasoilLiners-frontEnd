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
   // get last 7 days date in reverse order
   public Last7Days () {
    const result = [];
    for (let i = 1; i < 8; i++) {
        let d = new Date();
        d.setDate(new Date().getDate() - i);
        result.push(d.getDate() + '/' + (d.getMonth() + 1));
    }
    return result.reverse();
  }
  // get attendance parameters
  public attendance() {
    const attendaceParams = ['P', 'A', 'S', 'H', 'E', 'L', 'I', 'C', 'R'];
    return attendaceParams;
  }

  public Last3months(): any {
    const result = [];
    for (let i = 1; i < 4; i++) {
        result.push(this.monthNames[(new Date().getMonth() - i)]);
    }
    return result;
  }
}
