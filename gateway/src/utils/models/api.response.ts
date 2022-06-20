import { IApiResponseData } from "../../interfaces/responses/api";
import { HttpStatus } from "@nestjs/common";

export class ApiResponse<T> {
  constructor(private readonly res: IApiResponseData<T>) {}

  getData(): T | undefined {
    return this.res.data;
  }

  validate(message?: string): void {
    if (!this.isOk()) {
      throw new Error(message || this.res.error);
    }
  }

  isOk(): boolean {
    return this.res.status === HttpStatus.OK;
  }
}
