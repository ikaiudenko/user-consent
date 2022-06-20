import { IApiErrorResponse, IApiSuccessResponse, IUser } from "../interfaces";

import { User } from "../entities/user.entity";
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

export class UserSuccessResponse extends ApiSuccessResponse<IUser> {
  constructor(readonly data: User, readonly status: number = HttpStatus.OK) {
    super(data, status);
  }

  build(): IApiSuccessResponse<IUser> {
    const { id, email } = this.data;

    return {
      status: this.status,
      data: {
        id,
        email,
      },
    };
  }
}

export class UserFailResponse extends Response<undefined> {
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
