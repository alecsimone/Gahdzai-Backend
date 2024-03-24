import fetch from 'node-fetch';
import type { DataSeries, DataPoint } from '../../../../resolvers-types';

// * Queries FRED for a data series
interface FredResponseError {
  errorCode: number;
  error_message: string;
}

interface Observation {
  date: string;
  value: string;
}

interface FredResponseSuccess {
  units: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  observations: Observation[];
}

type FredResponse = FredResponseSuccess | FredResponseError;

type Signature = (url: string, symbol: string) => Promise<DataSeries>;

const queryFred: Signature = async (url, symbol) => {
  const rawData = await fetch(url);

  const data: FredResponse = (await rawData.json()) as FredResponse;

  console.log(data);

  if ('error_message' in data) {
    throw new Error(data.error_message);
  }

  const dataPoints: DataPoint[] = data.observations.map((observation) => ({
    value: parseFloat(observation.value),
    time: observation.date,
  }));

  const filteredDataPoints = dataPoints.filter((point) => !isNaN(point.value));

  const dataSeries: DataSeries = {
    symbol,
    dataPoints: filteredDataPoints,
    unit: 'Percent',
  };

  return dataSeries;
};

export default queryFred;
