import { Component, Input, OnInit } from '@angular/core';
import { CoinServiceProvider } from "../../providers/coin-service/coin-service";

@Component({
  selector: 'coin-item',
  templateUrl: 'coin-item.html'
})
export class CoinItemComponent implements OnInit {

  @Input() coin: any;
  baseUrl: string;
  price: number;

  constructor(public coinService: CoinServiceProvider) {
    this.baseUrl = this.coinService.baseUrl;
  }

  ngOnInit(): void {
    this.fetchPrice();
  }

  fetchPrice() {
    // console.log("Fetching price for " + this.coin.Name);
    this.coinService.getPriceInUSD(this.coin.Name)
      .then(data => {
        this.price = data['USD'];
      })
      .catch(err => console.error(err));
  }
}
