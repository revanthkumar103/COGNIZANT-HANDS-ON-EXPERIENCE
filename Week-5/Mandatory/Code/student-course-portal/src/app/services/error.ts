import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  showError(message: string): void {
    console.error('ErrorService emitting global banner alert:', message);
    this.errorSubject.next(message);
  }

  clearError(): void {
    this.errorSubject.next('');
  }
}
