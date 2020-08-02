import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "A connection to database failed"
  statusCode = 500

  constructor() {
    super('error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  public serializeErrors() {
    return [
      {
        message: this.reason
      }
    ]
  }
}