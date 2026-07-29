import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from './course';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledSubject = new BehaviorSubject<number[]>([101]);
  enrolledCourseIds$ = this.enrolledSubject.asObservable();

  constructor(private courseService: CourseService, private http: HttpClient) {}

  // Step 88: Perform POST request to /api/enroll
  submitEnrollmentToServer(courseId: number): Observable<any> {
    const payload = { courseId, studentId: 'STU001', timestamp: Date.now() };
    console.log('[EnrollmentService] Sending POST request to REST server /api/enroll:', payload);
    return this.http.post('/api/enroll', payload);
  }

  enroll(courseId: number): void {
    const currentIds = this.enrolledSubject.getValue();
    if (!currentIds.includes(courseId)) {
      this.enrolledSubject.next([...currentIds, courseId]);
      
      const course = this.courseService.getCourseById(courseId);
      if (course) {
        this.courseService.emitEnrollmentEvent(course.name);
      }
    }
  }

  unenroll(courseId: number): void {
    const currentIds = this.enrolledSubject.getValue();
    this.enrolledSubject.next(currentIds.filter(id => id !== courseId));
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledSubject.getValue().includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledSubject.getValue()
      .map(id => this.courseService.getCourseById(id))
      .filter((course): course is Course => course !== undefined);
  }

  getEnrolledCourses$(): Observable<Course[]> {
    return this.enrolledCourseIds$.pipe(
      map(ids => ids
        .map(id => this.courseService.getCourseById(id))
        .filter((course): course is Course => course !== undefined)
      )
    );
  }
}
