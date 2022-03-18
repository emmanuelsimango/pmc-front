import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {

  rateForm!: FormGroup;
  constructor(private _formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    this.rateForm = this._formBuilder.group({
      zwl_quote_currency_value: ['', Validators.required],
      usd_quote_currency_value: ['', Validators.required],
      user_id: Number(this.authService.getUser().user_id)
    });
  }

  onAddRate(){
    
  }

}
