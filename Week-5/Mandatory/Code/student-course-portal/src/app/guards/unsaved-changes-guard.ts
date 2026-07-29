import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<any> = (component) => {
  // Check if reactive registration form is dirty and has not been submitted yet
  if (component.regForm && component.regForm.dirty && !component.submitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  // Check if template-driven enrollment form is dirty and not submitted yet
  if (component.enrollForm && component.enrollForm.dirty && !component.submitted) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  if (component.canDeactivate) {
    return component.canDeactivate();
  }
  return true;
};
