import { v6 } from "uuid";

export class UuidGenerator {
  public static generate(): string {
    return v6();
  }
}
