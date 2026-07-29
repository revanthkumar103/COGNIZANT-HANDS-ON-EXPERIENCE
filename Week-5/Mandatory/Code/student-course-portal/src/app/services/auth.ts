import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true;

  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
    console.log('AuthService: login status toggled to:', this.isLoggedIn);
  }
}
