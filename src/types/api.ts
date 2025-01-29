export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Crypto = {
  ['Meta Data']: MetaData;
  ['Time Series (Digital Currency Daily)']: DailyTimeSeries;
  Information?: string;
};

interface MetaData {
  '1. Information': string;
  '2. Digital Currency Code': string;
  '3. Digital Currency Name': string;
  '4. Market Code': string;
  '5. Market Name': string;
  '6. Last Refreshed': string;
  '7. Time Zone': string;
}

type DailyTimeSeries = Record<string, TimeSeriesEntry>;

interface TimeSeriesEntry {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}
