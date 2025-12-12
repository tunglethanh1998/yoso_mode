export type BaseResponse<T> = {
  data?: T;
  success: boolean;
  message?: string;
  statusCode?: number;
  path?: string;
};
