import { FormControl } from '@angular/forms';

export function getErrorMessage(control: FormControl): string {
  if (control.hasError('required')) {
    return 'This field is required.';
  }

  if (control.hasError('minlength')) {
    return `The minimum length for this field is {% raw %}{{formGroup.get('toDo').errors.minlength.requiredLength}}{% endraw %} characters.`;
  }
  return control.hasError('email') ? 'Not a valid email' : '';
}
