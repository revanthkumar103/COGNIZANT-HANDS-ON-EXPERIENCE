import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

// Using component-level providers: [NotificationService] creates a brand new, separate instance of NotificationService
// that is scoped strictly to this NotificationComponent instance and its child components. Unlike root singletons,
// any changes made to this service instance will not affect other components across the application.
@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification implements OnInit {
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {}

  addAlert(): void {
    const timestamp = new Date().toLocaleTimeString();
    this.notificationService.addMessage(`New student notification triggered at ${timestamp}`);
  }
}
