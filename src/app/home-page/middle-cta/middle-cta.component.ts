import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-middle-cta',
  templateUrl: './middle-cta.component.html',
  styleUrls: ['./middle-cta.component.css']
})
export class MiddleCtaComponent implements OnInit {

  globalMarkets: string = '0';
  dominance: string = '0';
  accounts: string = '0';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCtaInfoApi();
  }

  getCtaInfoApi(){
    this.http.get("https://api.coinmarketcap.com/v1/global/").subscribe(data => {
      this.globalMarkets = parseInt(data['total_market_cap_usd']).toLocaleString('en');
      this.dominance = data['bitcoin_percentage_of_market_cap'];
      this.accounts = parseInt(data['active_assets']).toLocaleString('en');
    });
  }

}
