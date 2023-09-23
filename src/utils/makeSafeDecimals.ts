const makeSafeDecimals = (number: number | string) => {
  let definitelyNumber: number;
  if (typeof number === 'string') {
    definitelyNumber = parseFloat(number);
  } else {
    definitelyNumber = number;
  }

  const safeDecimal = Math.round(definitelyNumber * 100) / 100;
  return safeDecimal;
};

export default makeSafeDecimals;
