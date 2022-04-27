import queryString from 'query-string';
import { useRequest } from 'ahooks';
import { Options, Result } from 'ahooks/lib/useRequest/src/types';

type Api = {
  [key: string]: string;
};

type RequestData = {
  params?: { [key: string]: any };
  data?: { [key: string]: any };
  headers?: Headers;
};
type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';

type ServerResult = <T>(
  requestData?: RequestData | undefined,
  options?: Options<unknown, any[]> | undefined
) => Result<T, any[]>;

class Ajax {
  servers: {
    [key: string]: ServerResult;
  } = {};
  constructor(api: Api) {
    this.servers = this.initServers(api);
  }
  // 初始化 servers
  private initServers(api: Api) {
    let _servers: any = {};
    Object.keys(api).forEach(item => {
      const [method, url] = api[item].trim().replace(/\s+/g, ',').split(',');
      _servers[item] = this.createRequest(method.toUpperCase() as Method, url);
    });
    return _servers;
  }
  //创建useRequest 的请求函数
  private createRequest(method: Method, url: string) {
    return (requestData?: RequestData, options?: Options<unknown, any[]>) => {
      if (!requestData) requestData = {};
      return useRequest(this.createService(method, url, requestData), {
        ...options,
        onSuccess() {},
        onError() {},
      });
    };
  }
  // 创建 useRequest 的 service 参数
  private createService<T>(
    method: Method,
    url: string,
    requestData: RequestData
  ) {
    let { data, headers = {}, params } = requestData;
    let _url: string = url;

    if (params) {
      _url += `?${queryString.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      })}`;
    }

    return async function (...args: any[]): Promise<T> {
      const response = await fetch(_url, {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
          ...headers,
        },
        body: data && JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    };
  }
}
export default Ajax;
