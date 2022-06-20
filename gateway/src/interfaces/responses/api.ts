export interface IApiResponseData<T> {
  status: number;
  data?: T;
  error?: string;
}

export interface ISuccess {
  success: boolean;
}
