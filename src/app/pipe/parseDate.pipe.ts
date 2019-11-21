import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({ name: 'parseDate' })

export class ParseDate implements PipeTransform {
    constructor(private commonService: CommonService) {
    }
    transform(str: string): string {
        return this.commonService.parseDate(str);
    }
}
