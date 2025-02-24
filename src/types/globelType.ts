import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TErrorSource = {
  path: string;
  message: string;
};

export type TError = {
  success: boolean;
  statusCode: number;
  message: string;
  errorSources: TErrorSource[];
  stack: string;
};
export interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
export type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: TMeta;
  error?: TError;
  data?: T;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
