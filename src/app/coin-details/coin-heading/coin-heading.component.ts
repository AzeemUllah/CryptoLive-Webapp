import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-coin-heading',
  templateUrl: './coin-heading.component.html',
  styleUrls: ['./coin-heading.component.css']
})
export class CoinHeadingComponent implements OnInit {

  key: string = '';

  symbol: string = '';
  name: string = '';
  image_url: string = '';
  price_usd: string = '';
  price_btc: string = '';
  percent_change_1h: any = 0.0;


  constructor(private db: AngularFireDatabase, public router: ActivatedRoute) {
    this.router.params.subscribe( params => {
      this.symbol = params.symbol;
      this.getCoinDetails();
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
   // this.getCoinDetails();
  }

  getCoinDetails(){
    firebase.database().ref('/CryptoCurrency/coin').orderByChild('symbol').equalTo(this.symbol).once('value', snapshot => {
      for (var key in snapshot.val()) {
        firebase.database().ref('/CryptoCurrency/coin/'+key).once('value', snapshot => {
          var temp = snapshot.val();
          this.name = temp.name;
          this.image_url = temp.image_url;
          this.price_usd = parseFloat(temp.price_usd).toLocaleString('en');
          this.price_btc = (parseFloat(temp.price_btc).toFixed(6)).toString();
          this.percent_change_1h = parseFloat(temp.percent_change_1h);
        });
      }
    });


  }

}
