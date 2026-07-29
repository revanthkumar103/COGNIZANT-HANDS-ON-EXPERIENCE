import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { mockApiInterceptor } from './mock-api-interceptor';

describe('mockApiInterceptor', () => {
  const executeInterceptor: HttpInterceptorFn = (...interceptorParameters) => 
      TestBed.runInInjectionContext(() => mockApiInterceptor(...interceptorParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeInterceptor).toBeTruthy();
  });
});
