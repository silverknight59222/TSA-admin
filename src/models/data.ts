export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: String;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
