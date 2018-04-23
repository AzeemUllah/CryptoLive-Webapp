import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-bottom-cards',
  templateUrl: './bottom-cards.component.html',
  styleUrls: ['./bottom-cards.component.css']
})
export class BottomCardsComponent implements OnInit {


  coins: string = '';
  markets: string = '';
  exchanges: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCtaInfoApi();
  }

  getCtaInfoApi(){
    this.http.get("https://api.coinmarketcap.com/v1/global/").subscribe(data => {
      this.coins = data['active_currencies'];
      this.markets = data['active_assets'];
      this.exchanges = "47"
    });
  }

}
