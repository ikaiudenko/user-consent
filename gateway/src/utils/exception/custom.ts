import { HttpException } from "@nestjs/common";
import { LoggerCategory } from "../../globals/enums";

export class CustomHttpException extends HttpException {
  readonly category: LoggerCategory;

  readonly meta: Record<string, unknown> | null = null;

  constructor(message, status, category: LoggerCategory, meta?: Record<string, unknown>) {
    super(message, status);
    this.category = category;
    this.meta = meta;
  }
}
