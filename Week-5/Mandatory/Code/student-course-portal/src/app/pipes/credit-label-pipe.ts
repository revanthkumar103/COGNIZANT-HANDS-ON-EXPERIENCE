import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  pure: true // Step 96: Verify pure pipe performance to avoid unnecessary re-evaluations
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number): string {
    // Step 96: Log verification proving pure pipe is invoked only when actual input value changes
    console.log('[Pure Pipe Verification] CreditLabelPipe invoked for value:', value);

    if (value === 0) {
      return 'No Credit / Audit';
    } else if (value === 1) {
      return '1 Credit (Short Course)';
    } else {
      return `${value} Credits (Standard Course)`;
    }
  }
}
