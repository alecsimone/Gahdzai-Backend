export type DataSource = 'marketData' | 'polygon';

const getTokenString = (source: DataSource): string => {
  if (source === 'marketData') {
    const token = process.env.MARKET_DATA_APP_TOKEN;
    const tokenString = `Token ${token}`;

    return tokenString;
  } else if (source === 'polygon') {
    const token = process.env.POLYGON_API_KEY;
    const tokenString = `Bearer ${token}`;

    return tokenString;
  }
};

export default getTokenString;
