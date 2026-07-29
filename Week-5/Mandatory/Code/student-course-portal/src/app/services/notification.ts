import { Injectable } from '@angular/core';

// Note: We do NOT specify providedIn: 'root' here because we want to demonstrate component-level providers,
// where each component that specifies providers: [NotificationService] receives a new, isolated service instance.
@Injectable()
export class NotificationService {
  private messages: string[] = ['Welcome to your personal alert dashboard!'];

  addMessage(msg: string): void {
    this.messages.push(msg);
  }

  getMessages(): string[] {
    return this.messages;
  }
}
