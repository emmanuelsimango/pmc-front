import { ToastrService } from 'ngx-toastr';
import { ExchangeRateResponse } from './../../../models/trading-currency/exchange-rate-response';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradingCurrencyService } from 'src/app/services/trading-currency.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {
  @Output() actionComplete = new EventEmitter();
  rateForm!: FormGroup;
  submitted:boolean = false;

  constructor(private _formBuilder: FormBuilder,private authService: AuthService,private currencyService: TradingCurrencyService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.rateForm = this._formBuilder.group({
      zwl_quote_currency_value: ['', Validators.required],
      usd_quote_currency_value: ['', Validators.required],
      user_id: Number(this.authService.getUser().user_id)
    });
  }

  onAddRate(){
    this.submitted = true;

    if (this.rateForm.invalid) {
      console.log(this.rateForm);

      return;
    }




    const data:ExchangeRateResponse = {
      zwl_quote_currency_value:this.rateForm.get("zwl_quote_currency_value").value,
      usd_quote_currency_value:this.rateForm.get("usd_quote_currency_value").value,
      user_id:this.authService.getUser().user_id.toString(),
      is_active:"1"

    }

    this.currencyService.saveRate(data).subscribe(response=>{
      console.log(response);
      this.actionComplete.emit(true);
      this.rateForm.reset();
      this.toastr.success(
        `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Tadding currency saved`,
        "",
        {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-error alert-with-icon",
          positionClass: "toast-" + "top" + "-" + "center",
        }
      );
    })


  }

  get f() {
    return this._formBuilder.control;
  }


}
