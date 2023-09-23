const getTokenString = () => {
  const token = process.env.MARKET_DATA_APP_TOKEN;
  const tokenString = `Token ${token}`;

  return tokenString;
};

export default getTokenString;
