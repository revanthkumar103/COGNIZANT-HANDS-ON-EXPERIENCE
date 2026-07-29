import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth';
import { CourseService } from '../../services/course';
import { ErrorService } from '../../services/error';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  latestEnrollmentMsg = '';
  globalErrorMsg = '';
  private sub?: Subscription;
  private errorSub?: Subscription;
  private timer: any;

  constructor(
    public authService: AuthService, 
    private courseService: CourseService,
    public errorService: ErrorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.courseService.enrollmentEvents$.subscribe(courseName => {
      this.latestEnrollmentMsg = `New enrollment: ${courseName}`;
      this.cdr.detectChanges();

      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.latestEnrollmentMsg = '';
        this.cdr.detectChanges();
      }, 4500);
    });

    // Step 92: Listen to global errorSubject from ErrorService
    this.errorSub = this.errorService.error$.subscribe(errMsg => {
      this.globalErrorMsg = errMsg;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.errorSub) this.errorSub.unsubscribe();
    if (this.timer) clearTimeout(this.timer);
  }

  onDismissError(): void {
    this.errorService.clearError();
    this.cdr.detectChanges();
  }

  onToggleAuth(): void {
    this.authService.toggleLogin();
    this.cdr.detectChanges();
  }
}
