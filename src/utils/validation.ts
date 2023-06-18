import { REGEX } from '@constants/regex';

const validate = {
  phone: {
    length: (length: number) => length === 14 && true,
    form: (value: string) => value.match(REGEX.PHONE.FORM) && true,
    formWithLength: (value: string) =>
      value.match(REGEX.PHONE.WITH_LENGTH) && true,
    must10digits: (value: string) =>
      value.match(REGEX.PHONE.MUST_10_DIGITS) && true,
    must11digits: (value: string) =>
      value.match(REGEX.PHONE.MUST_11_DIGITS) && true,
    empty: (value: string) => value === '' && true,
  },
  email: {
    form: (value: string) => value.match(REGEX.EMAIL) !== null,
    empty: (value: string) => value === '' && true,
  },
  password: {
    length: (length: number) => 0 <= length && length < 8 && true,
    maxLength: (length: number) => length > 100 && true,
    empty: (value: string) => value === '' && true,
  },
  name: {
    korEng: (value: string) =>
      value.match(REGEX.KOREAN_ENGLISH_BLANK_ONLY) && true,
    empty: (value: string) => value === '' && true,
  },
  bookingPageName: {
    korEng: (value: string) => value.match(REGEX.KOREAN_ENGLISH_ONLY) && true,
  },
};

export { validate };
