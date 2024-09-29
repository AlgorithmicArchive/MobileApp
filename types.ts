// types.ts
export interface Field {
    isFormSpecific: boolean;
    name: string;
    label: string;
    type: string;
    validationFunctions?: string[];
    options?: string[]; // For select and radio fields
    maxLength?: number;
    minLength?: number;
  }
  