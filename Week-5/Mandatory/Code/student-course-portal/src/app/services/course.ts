import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { ErrorService } from './error';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 101, name: 'Introduction to Angular (REST API)', code: 'CS101', gradeStatus: 'passed', credits: 3 },
    { id: 102, name: 'Data Structures & Algorithms (REST API)', code: 'CS102', gradeStatus: 'pending', credits: 4 },
    { id: 103, name: 'Advanced Web Architecture (REST API)', code: 'CS201', gradeStatus: 'failed', credits: 0 },
    { id: 104, name: 'Cloud Computing Infrastructure (REST API)', code: 'CS301', gradeStatus: 'pending', credits: 3 },
    { id: 105, name: 'Database Management Systems (REST API)', code: 'CS205', gradeStatus: 'passed', credits: 4 }
  ];

  // Step 97: Convert core application state to Angular Signals
  coursesSignal = signal<Course[]>(this.courses);

  // Step 98: Implement derived reactive state using computed() signals
  passedCoursesCount = computed(() => this.coursesSignal().filter(c => c.gradeStatus === 'passed').length);
  totalCredits = computed(() => this.coursesSignal().reduce((acc, c) => acc + (c.credits || 0), 0));

  private enrollmentSubject = new Subject<string>();
  enrollmentEvents$ = this.enrollmentSubject.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService) {
    // Step 99: Declare reactive effect() side effect to track changes to courses signal
    effect(() => {
      console.log('[Angular Signal effect()] Courses Signal updated, current total count:', this.coursesSignal().length);
    });
  }

  // Step 87 & 97: Update signal via set() when REST data resolves
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      tap(courses => {
        this.courses = courses;
        this.coursesSignal.set(courses);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getCoursesSync(): Course[] {
    return this.coursesSignal();
  }

  searchCourses(term: string): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map(courses => {
        if (!term || !term.trim()) return courses;
        const cleanTerm = term.trim().toLowerCase();
        return courses.filter(c => 
          c.name.toLowerCase().includes(cleanTerm) || 
          c.code.toLowerCase().includes(cleanTerm)
        );
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getCourseById(id: number): Course | undefined {
    return this.coursesSignal().find(c => c.id === id);
  }

  getCourseById$(id: number): Observable<Course | undefined> {
    return of(this.getCourseById(id));
  }

  // Step 95 & 97: Immutability principles and Signal .update() mutation
  addCourse(course: Course): void {
    // Immutable array reference creation (avoiding direct .push mutation for OnPush support)
    this.courses = [...this.courses, course];
    // Reactive signal modification via update()
    this.coursesSignal.update(courses => [...courses, course]);
  }

  emitEnrollmentEvent(courseName: string): void {
    this.enrollmentSubject.next(courseName);
  }

  triggerSimulatedApiError(): Observable<any> {
    return this.http.get('/api/error').pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `HTTP Status ${error.status}: ${error.statusText || 'Server Failure'}`;
      if (typeof error.error === 'string') {
        errorMessage += ` - ${error.error}`;
      } else if (error.message) {
        errorMessage += ` (${error.message})`;
      }
    }
    console.error('[CourseService.handleError] Captured exception:', errorMessage);
    this.errorService.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
