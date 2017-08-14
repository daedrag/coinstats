import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoinServiceProvider } from "../../providers/coin-service/coin-service";
import * as _ from "underscore";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coinList: Array<any> = [];

  constructor(public navCtrl: NavController, public coinService: CoinServiceProvider) {
    this.coinService.getCoinList()
      .then(data => {
        this.coinList = _.first(
          _.sortBy(
            _.map(data, (value, id) => value),
            (item: any) => item.SortOrder  // sort by "SortOrder" attribute
          ),
          100  // first 100 items
        );
        console.log(this.coinList);
      })
      .catch(error => console.error(error));
  }

}
