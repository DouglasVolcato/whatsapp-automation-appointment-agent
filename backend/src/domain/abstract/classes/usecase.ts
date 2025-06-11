import { ValidatorInterface } from "../interfaces/validator-interface";

export abstract class UseCase {
  public async execute(input: any): Promise<any | Error> {
    const validators = this.setValidators();
    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return new Error(error);
      }
    }
    return this.handle(input);
  }

  public abstract setValidators(): ValidatorInterface[];

  public abstract handle(input: any): Promise<any>;
}
