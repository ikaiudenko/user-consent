export enum ServerCat {
  Info = "ServerInfo",
  Error = "ServerError",
  Warn = "ServerWarning",
}

export enum ValidationCat {
  App = "EventValidation",
}

export const EventCat = "EventCat";

export type LoggerCategory = ServerCat | ValidationCat | typeof EventCat;

export enum Levels {
  I = "info",
  E = "error",
  W = "warning",
}
