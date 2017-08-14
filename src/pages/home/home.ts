import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoinServiceProvider } from "../../providers/coin-service/coin-service";
import * as _ from "underscore";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fullCoinList: Array<any> = [];
  coinList: Array<any>;
  baseUrl: string;

  constructor(public navCtrl: NavController, public coinService: CoinServiceProvider) {
    this.baseUrl = this.coinService.baseUrl;

    this.coinService.getCoinList()
      .then(data => {
        this.fullCoinList = _.sortBy(
          _.map(data, (value, id) => value),
          (item: any) => item.SortOrder  // sort by "SortOrder" attribute
        );
        this.coinList = _.first(this.fullCoinList, 10);
      })
      .catch(error => console.error(error));
  }
}
