export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Crypto = {
  ['Meta Data']: {};
  ['Time Series (Digital Currency Daily)']: {};
  Information?: string;
};
