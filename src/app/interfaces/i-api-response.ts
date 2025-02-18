export interface iApiResponse<T = any> {
  data: T | null;
  message: string | null;
  status: 'SUCCESS' | 'ERROR';
}
