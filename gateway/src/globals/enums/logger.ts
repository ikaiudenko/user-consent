export enum ServerCat {
  Info = "ServerInfo",
  Error = "ServerError",
  Warn = "ServerWarning",
}

export enum ValidationCat {
  App = "AppValidation",
}

export enum UserCat {
  CreateFail = "CreateFail",
  DeleteFail = "UserDeleteFail",
  GetFail = "UserGetFail",
  GetWithConsentsFail = "UserGetWithConsentsFail",
}

export enum EventCat {
  CreateFail = "CreateFail",
}

export enum AuthCat {
  UserToken = "UserToken",
  ApiToken = "ApiToken",
}

export type LoggerCategory = ServerCat | ValidationCat | UserCat | AuthCat | EventCat;

export enum Levels {
  I = "info",
  E = "error",
  W = "warning",
}
