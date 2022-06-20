import { HttpStatus } from "@nestjs/common";
import { LoggerCategory } from "../../globals/enums";
import { CustomHttpException } from "./custom";

export class BadRequestCustom extends CustomHttpException {
  constructor(message, category: LoggerCategory, meta?: Record<string, unknown>) {
    super(message, HttpStatus.BAD_REQUEST, category, meta);
  }
}
