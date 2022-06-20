export enum UserSuccess {
  Get = "USER_FOUND",
  Create = "USER_CREATED",
  Delete = "USER_REMOVED",
}
export enum UserErrors {
  Conflict = "USER_CONFLICT",
  CreateFail = "USER_CREATE_FAIL",
  DeleteFail = "USER_DELETE_FAIL",
  GetFail = "USER_GET_FAIL",
}
