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
    this.updateRates();
  }

  updateRates(){
    this.currencyService.getAllExchangeRates().subscribe(rates=>{
      this.rates = rates
    })

  }

  actionCompleted(event){
    if (event) {
      this.updateRates();
    }
  }

}
