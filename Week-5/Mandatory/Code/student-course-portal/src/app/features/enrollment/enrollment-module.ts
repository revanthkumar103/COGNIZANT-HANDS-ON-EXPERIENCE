import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentRoutingModule } from './enrollment-routing-module';
import { EnrollmentForm } from '../../pages/enrollment-form/enrollment-form';

// Lazy-loaded feature module separating enrollment functionality into an autonomous chunk
@NgModule({
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    EnrollmentForm
  ]
})
export class EnrollmentModule { }
