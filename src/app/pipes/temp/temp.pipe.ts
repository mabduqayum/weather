import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TempPipe implements PipeTransform {
  transform(value: number): string {
    return `${Math.floor(value)}°`;
  }
}
