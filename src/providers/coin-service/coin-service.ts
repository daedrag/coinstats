import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CoinServiceProvider {

  baseUrl: string = 'https://www.cryptocompare.com/api/data';

  constructor(public http: Http) {
  }

  getCoinList() {
    return this.http.get(`${this.baseUrl}/coinlist`)
    .map(response => response.json().Data)
    .toPromise();
  }

}
