export const encrypt = (plain: string): string => {
  return Buffer.from(plain).toString('base64');
};

export const decrypt = (encoded: string): string => {
  return Buffer.from(encoded, 'base64').toString('utf-8');
};