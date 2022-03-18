import { ExchangeRateResponse } from './../models/trading-currency/exchange-rate-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class TradingCurrencyService {

  serverDetails:ServerDetails = new ServerDetails();
  constructor(private _http:HttpClient) { }

  saveRate(data:ExchangeRateResponse) {


    return this._http.post<ExchangeRateResponse>(`${this.serverDetails.api}/trading-currencies/save-one`,data);

  }

  public getAllExchangeRates():Observable<ExchangeRateResponse[]>
  {
    return this._http.get<ExchangeRateResponse[]>(`${this.serverDetails.api}/trading-currencies/get-all`);
  }
}
