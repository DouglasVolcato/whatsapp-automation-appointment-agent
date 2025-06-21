export enum ValidationEnum {
  required = "required",
  email = "email",
  number = "number",
  minLength5 = "minLength5",
  maxLength100 = "maxLength100",
}

export type ValidationType = {
  type: ValidationEnum;
  message: string;
};

export const validateValue = (value: any, validations: ValidationType[]) => {
  for (const validation of validations) {
    switch (validation.type) {
      case ValidationEnum.required:
        if (!value) {
          return validation.message;
        }
        break;
      case ValidationEnum.email:
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return validation.message;
        }
        break;
      case ValidationEnum.number:
        if (!value.match(/^\d+$/)) {
          return validation.message;
        }
        break;
      case ValidationEnum.minLength5:
        if (value.length < 5) {
          return validation.message;
        }
        break;
      case ValidationEnum.maxLength100:
        if (value.length > 100) {
          return validation.message;
        }
        break;
      default:
        break;
    }
  }
};
