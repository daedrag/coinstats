import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoinServiceProvider } from "../../providers/coin-service/coin-service";
import * as _ from "underscore";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  baseUrl: string;
  fullCoinList: Array<any> = [];
  coinList: Array<any>; 
  
  total: number;
  current: number;

  constructor(public navCtrl: NavController, public coinService: CoinServiceProvider) {
    this.baseUrl = this.coinService.baseUrl;

    this.coinService.getCoinList()
      .then(data => {
        this.fullCoinList = _.sortBy(
          _.map(data, (value, id) => value),
          (item: any) => item.SortOrder  // sort by "SortOrder" attribute
        );
        this.coinList = _.first(this.fullCoinList, 10);
        this.total = this.fullCoinList.length;
        this.current = this.coinList.length;
      })
      .catch(error => console.error(error));
  }

  loadNext() {
    if (this.current >= this.total)
      return;

    let start = this.current + 1;
    let end = this.current + 10;  // next 10 items
    if (start >= this.total)
      end = this.total;

    _.each(this.fullCoinList.slice(start-1, end-1), item => this.coinList.push(item));
    this.current = this.current + 10;
  }
}
