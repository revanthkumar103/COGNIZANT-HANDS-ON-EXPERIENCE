import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentIdValidator } from '../../validators/student-id.validator';

@Component({
  selector: 'app-student-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-registration.html',
  styleUrl: './student-registration.css',
})
export class StudentRegistration implements OnInit {
  regForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      studentId: ['', [Validators.required, studentIdValidator()]],
      hasScholarship: [false],
      scholarshipCode: [{ value: '', disabled: true }, [Validators.required]]
    });

    // Dynamically enable/disable scholarshipCode based on hasScholarship checkbox
    this.regForm.get('hasScholarship')?.valueChanges.subscribe(hasScholarship => {
      const codeCtrl = this.regForm.get('scholarshipCode');
      if (hasScholarship) {
        codeCtrl?.enable();
      } else {
        codeCtrl?.disable();
        codeCtrl?.reset();
      }
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    if (this.regForm.valid) {
      console.log('Form Value (enabled controls):', this.regForm.value);
      console.log('Raw Value (including disabled controls):', this.regForm.getRawValue());
      this.submitted = true;
      this.cdr.detectChanges();
    }
  }

  onReset(): void {
    this.regForm.reset({ hasScholarship: false });
    this.submitted = false;
    this.cdr.detectChanges();
  }
}
