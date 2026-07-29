import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCard, Highlight, CourseSummaryWidget],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;
  courses$: Observable<Course[]> | undefined;
  searchTerm = '';
  selectedCourseId?: number;
  
  private searchSubject = new Subject<string>();

  /*
   * Why using the Async Pipe (| async) in templates is superior to manual .subscribe():
   * 1. Automatic Cleanup: The async pipe automatically subscribes upon component initialization
   *    and cleanly unsubscribes when the component is destroyed, completely eliminating memory leaks.
   * 2. Less Boilerplate: Avoids storing explicit Subscription references or writing manual ngOnDestroy handlers.
   * 3. OnPush Compatibility: Automatically marks the component for change detection upon every emission,
   *    ensuring reliable UI rendering even when using OnPush change detection strategies.
   */

  constructor(
    private cdr: ChangeDetectorRef,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const querySearch = this.route.snapshot.queryParamMap.get('search') || '';
    this.searchTerm = querySearch;

    // Step 84: Debounced reactive search over REST stream
    this.courses$ = this.searchSubject.pipe(
      startWith(this.searchTerm),
      debounceTime(300),
      switchMap(term => this.courseService.searchCourses(term))
    );

    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    if (this.searchTerm.trim()) {
      this.router.navigate(['/courses'], { queryParams: { search: this.searchTerm } });
    } else {
      this.router.navigate(['/courses'], { queryParams: {} });
    }
    this.searchSubject.next(this.searchTerm);
  }

  // Step 91 & 92: Trigger simulated REST API failure to test error interception & global banner
  onTestApiError(): void {
    console.warn('[CourseList] Triggering simulated HTTP 500 error from mock API to verify ErrorService banner...');
    this.courseService.triggerSimulatedApiError().subscribe({
      next: () => {},
      error: (err) => console.log('Captured server error in component after interceptor:', err.message)
    });
  }

  onCardClick(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    this.cdr.detectChanges();
  }
}
