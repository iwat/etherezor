import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {
  //transform(value: any, args?: any): any {
  transform(value: string): string {
    return '*'.repeat(value.length);
  }
}
