import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import * as $ from 'jquery';

@Component({
  selector: 'app-coin-charts',
  templateUrl: './coin-charts.component.html',
  styleUrls: ['./coin-charts.component.css']
})
export class CoinChartsComponent implements OnInit {

  key: string = '';

  symbol: string = '';
  name: string = '';
  percent_change_1h: any = 0.0;
  percent_change_24h: any = 0.0;
  percent_change_7d: any = 0.0;

  constructor(private db: AngularFireDatabase, public router: ActivatedRoute) {
    this.router.params.subscribe( params => {
      this.symbol = params.symbol;
      this.getCoinDetails();
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    this.getCoinDetails();
  }

  getCoinDetails(){
    firebase.database().ref('/CryptoCurrency/coin').orderByChild('symbol').equalTo(this.symbol).once('value', snapshot => {
      for (var key in snapshot.val()) {
        firebase.database().ref('/CryptoCurrency/coin/'+key).once('value', snapshot => {
          var temp = snapshot.val();
          this.percent_change_1h = parseFloat(temp.percent_change_1h);
          this.percent_change_24h  = parseFloat(temp.percent_change_24h);
          this.percent_change_7d = parseFloat(temp.percent_change_7d);
        });
      }
    });


  }

}
