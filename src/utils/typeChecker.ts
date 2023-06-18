export const isString = (content: React.ReactNode): content is string => {
  return typeof content === 'string';
};
