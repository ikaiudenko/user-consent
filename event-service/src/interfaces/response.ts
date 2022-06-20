export interface IApiSuccessResponse<T> {
  status: number;
  data: T;
}

export interface IApiErrorResponse {
  status: number;
  error: string;
}

export interface ISuccess {
  success: boolean;
}
