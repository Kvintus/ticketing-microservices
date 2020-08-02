export interface ErrorObject {
  message: string;
  field?: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError)
  }

  public abstract serializeErrors(): ErrorObject[]
}