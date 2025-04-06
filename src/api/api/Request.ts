import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./Api";

type RequestMethod =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";

export class Request<T = unknown, R = AxiosResponse<T>, D = unknown> {
  private constructor(
    public method: RequestMethod,
    public url: string,
    public data?: D,
    public config?: AxiosRequestConfig<D>
  ) {}

  invoke(
    api: Api,
    configOverride: Partial<AxiosRequestConfig<D>> | undefined = undefined
  ): Promise<R> {
    const effectiveConfig = { ...this.config, ...configOverride };
    const url = `${api.base}/${this.url}`;

    switch (this.method) {
      case "get": // fallthrough
      case "delete": // fallthrough
      case "head": // fallthrough
      case "options": {
        return axios[this.method](url, effectiveConfig);
      }
      case "post": // fallthrough
      case "put": // fallthrough
      case "patch": {
        return axios[this.method](url, this.data, effectiveConfig);
      }
    }
  }

  // Methods without a body.

  static GET<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config: AxiosRequestConfig<D> | undefined = undefined
  ): Request<T, R, D> {
    return new Request("get", url, undefined, config);
  }

  static HEAD<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config: AxiosRequestConfig<D> | undefined = undefined
  ): Request<T, R, D> {
    return new Request("head", url, undefined, config);
  }

  static OPTIONS<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config: AxiosRequestConfig<D> | undefined = undefined
  ): Request<T, R, D> {
    return new Request("options", url, undefined, config);
  }

  // Methods with a body.

  static DELETE<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> | undefined = undefined
  ): Request<T, R, D> {
    return new Request("delete", url, undefined, { ...config, data });
  }

  static POST<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D | undefined = undefined,
    config: AxiosRequestConfig<D> | undefined = undefined
  ): Request<T, R, D> {
    return new Request("post", url, data, config);
  }

  static PUT<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D | undefined = undefined,
    config: AxiosRequestConfig<D> | undefined = undefined
  ): Request<T, R, D> {
    return new Request("put", url, data, config);
  }

  static PATCH<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D | undefined = undefined,
    config: AxiosRequestConfig<D> | undefined = undefined
  ): Request<T, R, D> {
    return new Request("patch", url, data, config);
  }
}
