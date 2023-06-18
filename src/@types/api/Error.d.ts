interface CustomError extends Error {
  response: {
    data: {
      status: {
        code: number;
        message: string;
      };
      results: string[] | null;
    };
  };
}

interface UserError extends Error {
  status: {
    code: number;
    message: string;
  };
}

interface RequestError extends Error {
  code: number;
  message: string;
}
