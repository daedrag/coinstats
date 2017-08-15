import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CoinServiceProvider {

  baseUrl: string = 'https://www.cryptocompare.com';
  apiUrl: string = `${this.baseUrl}/api/data`;

  priceUrl: string = "https://min-api.cryptocompare.com/data/price"; //  ?fsym=ETH&tsyms=BTC,USD,EUR"

  constructor(public http: Http) {
  }

  getCoinList() {
    return this.http.get(`${this.apiUrl}/coinlist`)
      .map(response => response.json().Data)
      .toPromise();
  }

  getPriceInUSD(name: string) {
    return this.http.get(`${this.priceUrl}?fsym=${name}&tsyms=USD`)
      .map(response => response.json())
      .toPromise();
  }

}
