import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required.';
    }

    if (control.hasError('minlength')) {
      return `The minimum length for this field is ${control.errors?.['minlength']?.['requiredLength']} characters.`;
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }
}
