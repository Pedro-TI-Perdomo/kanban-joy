export type FieldType = "text" | "number" | "select" | "checkbox" | "textarea" | "date";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[]; // For select fields
  defaultValue?: string | number | boolean;
  min?: number; // For number fields
  max?: number; // For number fields
}

export interface FormConfig {
  title: string;
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
}
