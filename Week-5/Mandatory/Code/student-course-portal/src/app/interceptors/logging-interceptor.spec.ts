import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { loggingInterceptor } from './logging-interceptor';

describe('loggingInterceptor', () => {
  const executeInterceptor: HttpInterceptorFn = (...interceptorParameters) => 
      TestBed.runInInjectionContext(() => loggingInterceptor(...interceptorParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeInterceptor).toBeTruthy();
  });
});
