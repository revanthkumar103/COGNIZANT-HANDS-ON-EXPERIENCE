import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Mock REST endpoint: GET /api/courses
  if (req.url === '/api/courses' && req.method === 'GET') {
    const mockCourses = [
      { id: 101, name: 'Introduction to Angular (REST API)', code: 'CS101', gradeStatus: 'passed', credits: 3 },
      { id: 102, name: 'Data Structures & Algorithms (REST API)', code: 'CS102', gradeStatus: 'pending', credits: 4 },
      { id: 103, name: 'Advanced Web Architecture (REST API)', code: 'CS201', gradeStatus: 'failed', credits: null },
      { id: 104, name: 'Cloud Computing Infrastructure (REST API)', code: 'CS301', gradeStatus: 'pending', credits: 3 },
      { id: 105, name: 'Database Management Systems (REST API)', code: 'CS205', gradeStatus: 'passed', credits: 4 }
    ];
    return of(new HttpResponse({ status: 200, body: mockCourses })).pipe(delay(400));
  }

  // Mock REST endpoint: POST /api/enroll
  if (req.url === '/api/enroll' && req.method === 'POST') {
    const responseBody = {
      success: true,
      message: 'Enrollment POST completed successfully against REST backend.',
      data: req.body,
      timestamp: new Date().toISOString()
    };
    return of(new HttpResponse({ status: 200, body: responseBody })).pipe(delay(600));
  }

  // Mock REST endpoint for testing error interception and red global error banner
  if (req.url === '/api/error') {
    const mockError = new HttpErrorResponse({
      error: 'Simulated internal server error from REST backend database (Status 500)!',
      status: 500,
      statusText: 'Internal Server Error',
      url: req.url
    });
    return throwError(() => mockError).pipe(delay(400));
  }

  return next(req);
};
