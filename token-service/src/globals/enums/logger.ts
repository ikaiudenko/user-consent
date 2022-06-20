export enum ServerCat {
  Info = "ServerInfo",
  Error = "ServerError",
  Warn = "ServerWarning",
}

export const TokenCat = "TokenCat";

export type LoggerCategory = ServerCat | typeof TokenCat;

export enum Levels {
  I = "info",
  E = "error",
  W = "warning",
}
