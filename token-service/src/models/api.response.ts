import { IApiErrorResponse, IApiSuccessResponse } from "../interfaces/response";

import { HttpException, HttpStatus } from "@nestjs/common";

export abstract class Response<T> {
  abstract readonly status?: number;

  abstract build(): IApiSuccessResponse<T> | IApiErrorResponse;
}

export class ApiSuccessResponse<T> extends Response<T> {
  constructor(readonly data: T, readonly status: number = HttpStatus.OK) {
    super();
  }

  build(): IApiSuccessResponse<T> {
    return { status: this.status, data: this.data };
  }
}

export class ApiFailResponse extends Response<undefined> {
  // eslint-disable-next-line handle-callback-err
  constructor(readonly error: HttpException, readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    super();
  }

  build(): IApiErrorResponse {
    return {
      status: this.error.getStatus() || this.status,
      error: this.error.message,
    };
  }
}
