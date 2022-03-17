import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServiceProvider } from '../models/service-provider';
import { ServerDetails } from '../models/server-details';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  serverDetails:ServerDetails = new ServerDetails();
  constructor(private _http:HttpClient) { }


  public getAll():Observable<ServiceProvider[]>
  {
    return this._http.get<ServiceProvider[]>(`${this.serverDetails.api}/product-service-providers/get-all`);
  }
}
