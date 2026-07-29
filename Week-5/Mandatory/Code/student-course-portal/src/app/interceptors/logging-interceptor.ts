import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  // Step 90: Clone request to attach Authorization header (Bearer token)
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer SAMPLE_JWT_TOKEN_12345',
      'X-Portal-Client': 'Angular-Web-App'
    }
  });

  console.log(`[HTTP Interceptor Outgoing] ${authReq.method} ${authReq.url} | Header: Authorization=${authReq.headers.get('Authorization')} | Time: ${new Date().toLocaleTimeString()}`);

  return next(authReq).pipe(
    tap(() => {
      const duration = Date.now() - startTime;
      console.log(`[HTTP Success Response] ${authReq.url} resolved in ${duration}ms`);
    }),
    catchError((error: HttpErrorResponse) => {
      const duration = Date.now() - startTime;
      console.error(`[HTTP Error Intercepted] ${authReq.url} failed after ${duration}ms with status code ${error.status}`);
      return throwError(() => error);
    })
  );
};
