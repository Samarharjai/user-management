export interface IFormValues extends Record<string, string> {}

export interface Validations {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
}

export interface Todo {
  id: string;
  title: string;
}
