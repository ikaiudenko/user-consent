export enum ServerCat {
  Info = "ServerInfo",
  Error = "ServerError",
  Warn = "ServerWarning",
}

export enum ValidationCat {
  App = "UserValidation",
}

export enum UserCat {
  GetFail = "UserGetFail",
  CreateFail = "UserCreateFail",
  GetSuccess = "UserGetSuccess",
  CreateSuccess = "UserCreateSuccess",
  DeleteFail = "UserDeleteFail",
  DeleteSuccess = "UserDeleteSuccess",
}

export type LoggerCategory = ServerCat | ValidationCat | UserCat;

export enum Levels {
  I = "info",
  E = "error",
  W = "warning",
}
