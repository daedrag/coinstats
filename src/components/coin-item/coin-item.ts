import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CoinServiceProvider } from "../../providers/coin-service/coin-service";
import { Observable, Subscription } from "rxjs/Rx";
import { ItemSliding } from "ionic-angular";

@Component({
  selector: 'coin-item',
  templateUrl: 'coin-item.html'
})
export class CoinItemComponent implements OnInit, OnDestroy {
  @ViewChild('slidingItem') slidingItem: ItemSliding;
  
  @Input() coin: any;
  baseUrl: string;
  price: number = 0;
  rising: boolean = true;
  
  autoRefresh: boolean = false;

  timerSubscription: Subscription;
  timer: Observable<number>;

  countDownLimit: number = 5; // 5 times, meaning 5 secs
  countDownNow: number = 0;

  constructor(public coinService: CoinServiceProvider) {
    this.baseUrl = this.coinService.baseUrl;
  }

  ngOnInit(): void {
    let initialDelay = 1000;    // ms
    let tickingInterval = 1000; // ms
    this.timer = Observable.timer(initialDelay, tickingInterval);
    this.fetchPrice();  // fetch price for the first time
  }

  ngOnDestroy(): void {
    if (!this.timerSubscription)
      return;
    this.timerSubscription.unsubscribe();
  }

  toggleAutoRefresh() {
    this.autoRefresh = !this.autoRefresh;
    this.slidingItem.close();
    if (this.autoRefresh) {
      if (!this.timerSubscription) {
        this.timerSubscription = this.timer.subscribe(n => {
          this.countDownNow = this.countDownNow + 1;
          if (this.countDownNow > this.countDownLimit) {
            this.fetchPrice();  // count down will be reset inside this fetch
          }
        });
      }
    } else {
      this.countDownNow = 0;
      if (this.timerSubscription)
        this.timerSubscription.unsubscribe();
    }
  }

  fetchPrice() {
    this.slidingItem.close();
    this.countDownNow = 0;  // reset count down
    let previousPrice = this.price;
    this.coinService.getPriceInUSD(this.coin.Name)
      .then(data => {
        this.price = data['USD'];
        this.rising = this.price >= previousPrice;
      })
      .catch(err => console.error(err));
  }
}
