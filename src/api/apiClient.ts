import superagent, { Response } from 'superagent';

const API_ROOT = 'https://jsonplaceholder.typicode.com';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseBody = <T = any>(res: Response) => res.body as T;

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReqBody = string | Record<string, unknown> | any[];

const apiClient = {
  del: <T>(url: string): Promise<T> => superagent.del(`${API_ROOT}${url}`).then((body) => responseBody<T>(body)),
  get: <T>(url: string): Promise<T> => superagent.get(`${API_ROOT}${url}`).then((body) => responseBody<T>(body)),
  put: <T>(url: string, body: ReqBody): Promise<T> =>
    superagent
      .put(`${API_ROOT}${url}`)
      .send(body)
      .then((body) => responseBody<T>(body)),
  post: <T>(url: string, body: ReqBody): Promise<T> =>
    superagent
      .put(`${API_ROOT}${url}`)
      .send(body)
      .then((body) => responseBody<T>(body)),
};

export const Posts = {
  all: (): Promise<Post[]> => apiClient.get<Post[]>('/posts'),
};

export default apiClient;
