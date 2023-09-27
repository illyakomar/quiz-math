enum Methods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export abstract class ApiService {
  private static async makeRequest<T = any>(
    method: Methods,
    url: string,
    data?: any,
    headers?: HeadersInit,
  ): Promise<any> {
    try {
      const requestBody = method === Methods.DELETE ? { data } : data;
      const response = await fetch(url, { method, headers, body: JSON.stringify(requestBody) });
      if (!response.ok) throw Error(await response.text());
      return { data: await response.json() };
    } catch (error: any) {
      console.log(error);
      return { error: error.message };
    }
  }

  private static async makeRequestWithBody<T = any>(
    method: Methods,
    url: string,
    data?: any,
    headers?: HeadersInit,
  ): Promise<any> {
    return this.makeRequest<T>(method, url, data, {
      ...headers,
      'Content-Type': 'application/json',
    });
  }

  public static async get<T = any>(url: string, data?: any, headers?: HeadersInit): Promise<any> {
    return this.makeRequest<T>(Methods.GET, url, data, headers);
  }

  public static async post<T = any>(url: string, data?: any, headers?: HeadersInit): Promise<any> {
    return this.makeRequestWithBody<T>(Methods.POST, url, data, headers);
  }

  public static async patch<T = any>(
    url: string,
    data?: any,
    headers?: HeadersInit,
  ): Promise<any> {
    return this.makeRequestWithBody<T>(Methods.PATCH, url, data, headers);
  }

  public static async delete<T = any>(
    url: string,
    data?: any,
    headers?: HeadersInit,
  ): Promise<any> {
    return this.makeRequestWithBody<T>(Methods.DELETE, url, data, headers);
  }
}
