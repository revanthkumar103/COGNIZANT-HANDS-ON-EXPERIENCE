import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { StudentRegistration } from './pages/student-registration/student-registration';
import { CoursesLayout } from './components/courses-layout/courses-layout';
import { CourseDetail } from './pages/course-detail/course-detail';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail }
    ]
  },
  {
    path: 'enroll',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    loadChildren: () => import('./features/enrollment/enrollment-module').then(m => m.EnrollmentModule)
  },
  {
    path: 'register',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    component: StudentRegistration
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: StudentProfile
  },
  // The wildcard '**' route must always be placed at the very end of the array because Angular matches routes sequentially in order.
  {
    path: '**',
    component: NotFound
  }
];