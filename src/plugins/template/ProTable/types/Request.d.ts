import { RequestOptionsInit } from 'umi-request';

declare const request: <T = any>(
  url: string,
  options?: RequestOptionsInit,
  selfError?: boolean,
) => Promise<T>;
