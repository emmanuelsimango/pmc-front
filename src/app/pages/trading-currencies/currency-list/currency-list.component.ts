import { TradingCurrencyService } from './../../../services/trading-currency.service';
import { Component, OnInit } from '@angular/core';
import { ExchangeRateResponse } from 'src/app/models/trading-currency/exchange-rate-response';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  rates!: ExchangeRateResponse[]
  constructor(private currencyService: TradingCurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getAllExchangeRates().subscribe(apiRates=>{
      this.rates = apiRates
    })
  }

}
