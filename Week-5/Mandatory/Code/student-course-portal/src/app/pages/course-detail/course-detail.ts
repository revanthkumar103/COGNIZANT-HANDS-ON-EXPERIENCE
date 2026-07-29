import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course?: Course;
  idParam: string | null = null;

  get isEnrolled(): boolean {
    return !!this.course && this.enrollmentService.isEnrolled(this.course.id);
  }

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // route.snapshot.paramMap is fine for parameter reading when the component does not switch between different IDs while active.
    this.idParam = this.route.snapshot.paramMap.get('id');
    if (this.idParam) {
      this.course = this.courseService.getCourseById(Number(this.idParam));
      this.cdr.detectChanges();
    }
  }

  toggleEnrollment(): void {
    if (this.course) {
      if (this.isEnrolled) {
        this.enrollmentService.unenroll(this.course.id);
      } else {
        this.enrollmentService.enroll(this.course.id);
      }
      this.cdr.detectChanges();
    }
  }
}
