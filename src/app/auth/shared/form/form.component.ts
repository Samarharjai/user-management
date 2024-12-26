import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Validations, type IFormValues } from '../../auth.model';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  heading = input.required<string>();
  inputs = input.required<
    {
      label: string;
      name: string;
      type?: string;
      placeholder?: string;
      validations?: Validations;
    }[]
  >();

  navigate = input.required<{ label: string; url: string | string[] }>();
  submitBtnLabel = input('Submit');

  complete = output<IFormValues>();

  formErrors: Record<string, string> = {};

  private getValidations(key: string) {
    const inputs = this.inputs();
    return inputs.find((input) => input.name === key)?.validations || {};
  }

  onSubmit(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formValues: IFormValues = {};
    formData.forEach((value, key) => {
      value = value.toString();
      formValues[key] = value;

      const validations = this.getValidations(key);
      if (validations) this.validateInput(key, value, validations);
    });

    if (Object.keys(this.formErrors).length) return;

    this.complete.emit(formValues);
  }

  onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.validateInput(
      input.name,
      input.value,
      this.getValidations(input.name)
    );
  }

  validateInput(key: string, value: string, validations: Record<string, any>) {
    for (const [rule, param] of Object.entries(validations)) {
      if (rule === 'required' && !value.trim().length) {
        this.formErrors[key] = 'Field is required';
        return;
      }
      if (rule === 'maxLength' && value.trim().length > param) {
        this.formErrors[key] = `Max ${param} characters are allowed`;
        return;
      }
      if (rule === 'minLength' && value.trim().length < param) {
        this.formErrors[key] = `Min ${param} characters are allowed`;
        return;
      }
      if (
        rule === 'email' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ) {
        this.formErrors[key] = 'Invalid email address';
        return;
      }
    }
    delete this.formErrors[key];
  }
}
