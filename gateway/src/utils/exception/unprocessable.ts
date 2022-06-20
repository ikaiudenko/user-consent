import { HttpStatus } from "@nestjs/common";
import { LoggerCategory } from "../../globals/enums";
import { CustomHttpException } from "./custom";

export class UnprocessableEntityCustom extends CustomHttpException {
  constructor(message, category: LoggerCategory, meta?: Record<string, unknown>) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, category, meta);
  }
}
