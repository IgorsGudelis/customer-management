import { AbstractControl, FormGroup } from '@angular/forms';

export class InputHelper {
  static trimCtrlsValue(form: FormGroup): void {
    for (const control of Object.values(form.controls)) {
      InputHelper.trimCtrlValue(control);
    }
  }

  static trimCtrlValue(control: AbstractControl): void {
    const value: string = control.value;

    if (typeof value === 'string') {
      control.setValue(value && value.trim());
    }
  }
}
