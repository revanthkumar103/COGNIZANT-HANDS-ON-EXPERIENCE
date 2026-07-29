import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function studentIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    // Student ID must start with 'STU' followed by exactly 4 digits (e.g., STU1234)
    const valid = /^STU\d{4}$/.test(value);
    return !valid ? { invalidStudentId: { value: control.value } } : null;
  };
}
