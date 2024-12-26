import { Component } from '@angular/core';
import { FormComponent } from '../shared/form/form.component';
import { type IFormValues } from '../auth.model';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  onSubmit(formValues: IFormValues) {
    console.log(formValues);
    console.log('forgot');
  }
}
