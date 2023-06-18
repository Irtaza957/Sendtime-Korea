export const encodeBase64Json = <T>(json: T): string => {
  return Buffer.from(JSON.stringify(json)).toString('base64');
};

export const decodeBase64Json = <T>(base64: string): T => {
  return JSON.parse(Buffer.from(base64, 'base64').toString());
};
