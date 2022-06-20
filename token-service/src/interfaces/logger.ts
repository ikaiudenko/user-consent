import { LoggerCategory } from "../globals/enums";

export interface ILogDetails<T> {
  // Category name in logging system
  category: LoggerCategory;
  // Error message or full error stack trace. It's being used only for logging system.
  error?: string | Error;
  // Used data/payload when exception happened
  extra?: T;
}
