class ErrorResponse extends Error {
  statusCode: number;
  data?: any;

  constructor(
    message: string,
    statusCode: number,
    data?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ErrorResponse;
