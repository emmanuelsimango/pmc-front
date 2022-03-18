export interface ExchangeRateResponse {
  pound_currency_id?: number;
  usd_quote_currency_value: string;
  zwl_quote_currency_value: string;
  is_active: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}
