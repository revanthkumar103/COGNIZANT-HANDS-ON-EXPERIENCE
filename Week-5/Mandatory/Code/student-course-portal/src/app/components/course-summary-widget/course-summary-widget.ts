import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Step 94 & 100: OnPush strategy paired with Signals
})
export class CourseSummaryWidget {
  constructor(public courseService: CourseService) {}

  get courseCount(): number {
    return this.courseService.coursesSignal().length;
  }

  addDummyCourse(): void {
    const newId = 100 + this.courseCount + 1;
    const sampleCourse: Course = {
      id: newId,
      name: `Advanced Microservices Vol ${newId - 105} (Signal Added)`,
      code: `CS${newId}`,
      gradeStatus: 'passed', // Set to passed to clearly demonstrate computed() passedCoursesCount instantly updating!
      credits: 3
    };
    // Step 95 & 97: Trigger immutable signal update via service
    this.courseService.addCourse(sampleCourse);
  }
}
