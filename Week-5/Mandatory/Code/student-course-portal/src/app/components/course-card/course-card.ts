import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Step 94: Enable OnPush change detection for optimal performance
})
export class CourseCard {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  isEnrolling = false;

  constructor(public enrollmentService: EnrollmentService, private cdr: ChangeDetectorRef) {}

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  get cardClasses() {
    return {
      'status-passed': this.course.gradeStatus === 'passed',
      'status-failed': this.course.gradeStatus === 'failed',
      'status-pending': this.course.gradeStatus === 'pending',
    };
  }

  getBorderColor(status: string): string {
    switch (status) {
      case 'passed': return '#2e7d32';
      case 'failed': return '#d32f2f';
      case 'pending': return '#ff9800';
      default: return '#ccc';
    }
  }

  onEnrollClick() {
    this.enrollRequested.emit(this.course.id);
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
      this.cdr.markForCheck(); // OnPush best practice: mark component for check upon user interaction
    } else {
      this.isEnrolling = true;
      this.cdr.markForCheck();

      this.enrollmentService.submitEnrollmentToServer(this.course.id).subscribe({
        next: (response) => {
          console.log('[HTTP POST Success] Server confirmed enrollment:', response);
          this.enrollmentService.enroll(this.course.id);
          this.isEnrolling = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('[HTTP POST Error] Reverting optimistic UI state due to server failure:', err);
          this.isEnrolling = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  onToggleDetails() {
    this.isExpanded = !this.isExpanded;
    this.cdr.markForCheck();
  }
}
