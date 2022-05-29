import { Pipe, PipeTransform } from '@angular/core';

const SizeUnits = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb'];

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {

  transform(input: any): string {
    if(input === null) return '';

    const power = Math.min(Math.floor(Math.log(input) / Math.log(1024)), SizeUnits.length - 1);
    const size = input / Math.pow(1024, power);
    const value = Math.round(size * 10) / 10;
    const unit = SizeUnits[power];

    return `${value} ${unit}`;
  }

}
