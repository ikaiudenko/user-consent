import { IApiErrorResponse, IApiSuccessResponse } from "../interfaces";

import { HttpException, HttpStatus } from "@nestjs/common";
import { IEvent } from "@src/interfaces/event";
import { EventEntity } from "@src/entities/event.entity";

export abstract class Response<T> {
  abstract readonly status?: number;

  abstract build(): IApiSuccessResponse<T> | IApiErrorResponse;
}

export class ApiSuccessResponse<K, T> extends Response<K | T> {
  constructor(readonly data: K, readonly status: number = HttpStatus.OK) {
    super();
  }

  build(): IApiSuccessResponse<K | T> {
    return { status: this.status, data: this.data };
  }
}

export class EventsSuccessResponse extends ApiSuccessResponse<EventEntity | EventEntity[], IEvent | IEvent[]> {
  constructor(readonly data: EventEntity | EventEntity[], readonly status: number = HttpStatus.OK) {
    super(data, status);
  }

  build(): IApiSuccessResponse<IEvent | IEvent[]> {
    const data = Array.isArray(this.data) ? this.data.map((i) => this.map(i)) : this.map(this.data);

    return { status: this.status, data };
  }

  map(item?: EventEntity): IEvent {
    return {
      id: item.type,
      enabled: item.enabled,
    };
  }
}

export class EventsFailResponse extends Response<undefined> {
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
