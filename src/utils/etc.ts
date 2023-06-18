export const getKeyByValue = <T extends string>(
  object: Record<T, string>,
  value: string
): T => {
  return Object.keys(object).find((key) => object[key as T] === value) as T;
};

export const makeQueryString = (query?: string | string[]) => {
  if (typeof query === 'string') return query;

  return '';
};
