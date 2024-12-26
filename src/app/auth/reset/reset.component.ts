import { Component } from '@angular/core';
import { FormComponent } from '../shared/form/form.component';
import { type IFormValues } from '../auth.model';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent {
  onSubmit(formValues: IFormValues) {
    console.log(formValues);
    console.log('reset');
  }
}
