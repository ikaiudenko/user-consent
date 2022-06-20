import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { LoggerService } from "../core/logger/logger.service";
import { LoggerCategory } from "../../globals/enums";

@Injectable()
export class Exception {
  constructor(private logger: LoggerService) {}

  badRequest(message, category: LoggerCategory, extra?: Record<string, unknown>): BadRequestException {
    this.log(message, category, extra);

    return new BadRequestException(message);
  }

  notFound(message, category: LoggerCategory, extra?: Record<string, unknown>): BadRequestException {
    this.log(message, category, extra);

    return new NotFoundException(message);
  }

  conflict(message, category: LoggerCategory, extra?: Record<string, unknown>): BadRequestException {
    this.log(message, category, extra);

    return new ConflictException(message);
  }

  log(message, category: LoggerCategory, extra?: Record<string, unknown>): void {
    this.logger.error(message, { category, extra });
  }
}
