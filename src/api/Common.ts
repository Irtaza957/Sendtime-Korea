export interface Response<T> {
  status: {
    code: number;
    message: string;
  };
  results: T[];
}
