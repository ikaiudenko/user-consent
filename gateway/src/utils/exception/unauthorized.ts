import { HttpStatus } from "@nestjs/common";
import { LoggerCategory } from "../../globals/enums";
import { CustomHttpException } from "./custom";

export class UnauthorizedCustom extends CustomHttpException {
  constructor(message, category: LoggerCategory, meta?: Record<string, unknown>) {
    super(message, HttpStatus.UNAUTHORIZED, category, meta);
  }
}
