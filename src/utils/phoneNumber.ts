const makePhoneNumberWithHyphen = (number: string) => {
  if (!number) return '';

  number = number.replace(/[^0-9]/g, '');

  const result = [];
  let restNumber = '';

  result.push(number.substring(0, 3));
  restNumber = number.substring(3);

  if (restNumber.length === 7) {
    result.push(restNumber.substring(0, 3));
    result.push(restNumber.substring(3));
  } else {
    result.push(restNumber.substring(0, 4));
    result.push(restNumber.substring(4));
  }

  return result.filter((val) => val).join('-');
};

const makePhoneNumberWithHyphen10Digits = (number: string) => {
  if (!number) return '';

  number = number.replace(/[^0-9]/g, '');

  const result = [];
  let restNumber = '';

  result.push(number.substring(0, 2));
  restNumber = number.substring(2);

  if (restNumber.length === 7) {
    result.push(restNumber.substring(0, 3));
    result.push(restNumber.substring(3));
  } else {
    result.push(restNumber.substring(0, 4));
    result.push(restNumber.substring(4));
  }

  return result.filter((val) => val).join('-');
};

export { makePhoneNumberWithHyphen, makePhoneNumberWithHyphen10Digits };
