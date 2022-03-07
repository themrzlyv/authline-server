class ApiError {
  public code;
  public message;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  static badRequest(code: number,msg: string) {
    return new ApiError(code, msg);
  }

  static internalError(msg: string) {
    return new ApiError(500, msg);
  }
}

export default ApiError;
