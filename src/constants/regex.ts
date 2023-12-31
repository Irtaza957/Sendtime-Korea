const REGEX = {
  ENGLISH_NUMBER_ONLY: /^[A-Za-z\d]+$/i,
  KOREAN_ENGLISH_ONLY: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z]*$/g,
  KOREAN_ENGLISH_BLANK_ONLY: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\s]*$/g,
  OTP: /^[0-9]{0,6}$/g,
  PHONE: {
    FORM: /^[0-9|-]*$/g,
    WITH_LENGTH: /^[0-9|-]{0,13}$/g,
    MUST_10_DIGITS: /^[0-9|-]{12}$/g,
    MUST_11_DIGITS: /^[0-9|-]{13}$/g,
  },
  EMAIL:
    /^[^<>()[\]\\,;:\\%#^\s@\\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,}))$/,
};
///^[a-z0-9]+(?!.*(?:\+{2,}|_{2,}|-{2,}|\.{2,}))(?:[.+\-_]{0,1}[a-z0-9])*@([a-zA-Z0-9-_]+)([.])([a-zA-Z]+)/,
// /^[^<>()[\]\\,;:\\%#^\s@\\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/,
export { REGEX };
