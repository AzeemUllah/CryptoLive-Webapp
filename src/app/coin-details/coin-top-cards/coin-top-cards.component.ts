import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-coin-top-cards',
  templateUrl: './coin-top-cards.component.html',
  styleUrls: ['./coin-top-cards.component.css']
})
export class CoinTopCardsComponent implements OnInit {

  symbol: string = '';

  marketCapUsd: string = '';
  volume24Hr: string = '';
  calculatingSupply: string = '';
  maxSupply: string = '';
  volumeMcap: string = '';

  constructor(private db: AngularFireDatabase, public router: ActivatedRoute) {
    this.router.params.subscribe( params =>{
      this.symbol = params.symbol;
      this.getCoinDetails();
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    // this.getCoinDetails();
  }

  getCoinDetails() {
    firebase.database().ref('/CryptoCurrency/coin').orderByChild('symbol').equalTo(this.symbol).once('value', snapshot => {
      for (var key in snapshot.val()) {
        firebase.database().ref('/CryptoCurrency/coin/' + key).once('value', snapshot => {
          var temp = snapshot.val();
          this.marketCapUsd = parseInt(temp.market_cap_usd).toLocaleString('en');
          this.volume24Hr = parseInt(temp.volume_usd_24h).toLocaleString('en');
          this.calculatingSupply = parseInt(temp.total_supply).toLocaleString('en');
          this.maxSupply = parseInt(temp.max_supply).toLocaleString('en');
          this.volumeMcap = temp.percent_change_1h;
        });
      }
    });
  }
}
