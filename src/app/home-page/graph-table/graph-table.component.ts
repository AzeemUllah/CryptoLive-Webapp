import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import * as $ from "jquery";



@Component({
  selector: 'app-graph-table',
  templateUrl: './graph-table.component.html',
  styleUrls: ['./graph-table.component.css']
})
export class GraphTableComponent implements OnInit {

  coinsList: any = [];
  coinsListId: any = [];

  currentPage: number = 1;
  currentStartValue: number = 1;
  currentEndValue: number = 10;

  pagination: boolean = true;

  isSearching: boolean = false;


  sampleLineChartData: Array<any> = [
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  // lineChart
  lineChartData: any = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
 //  sampleLineChartData: any = [
 //  [7989.92, 8019.98, 8135.82, 8119.35, 8125.88, 8136.2, 8204.65, 8216.61, 8182.15, 8189.96, 8172.29, 8209.81, 8241.97, 8216, 8209.77, 8206.47, 8198.5, 8191.57, 8206.07, 8252.36, 8259.86, 8231.07, 8262, 8256.47, 8257.59],
 //  [508.88, 509.9, 516.26, 514.81, 515.69, 516.94, 522.59, 524.89, 522.66, 525.78, 525.51, 530.39, 537.34, 536.44, 535.18, 532.38, 532.82, 532.22, 531.78, 535.09, 535.43, 536.71, 543.3, 546.48, 545.33], 
 //  [0.6739, 0.6782, 0.6863, 0.6854, 0.689, 0.6995, 0.7143, 0.7283, 0.7153, 0.7132, 0.72, 0.7218, 0.7341, 0.7311, 0.7253, 0.722, 0.7221, 0.7124, 0.7097, 0.7184, 0.7198, 0.7154, 0.7217, 0.7221, 0.7235],
 //  [824.49, 837.42, 870.61, 883.37, 880.89, 889.8, 888.12, 884.92, 880.73, 895.45, 890.04, 892.68, 897.1, 890.72, 887.52, 886.21, 892.75, 887.61, 887.34, 894.81, 892.51, 895.75, 936.81, 948.43, 941.3],
 //  [134.75, 135.7, 137.29, 137.24, 138.41, 138.63, 139.32, 141.37, 139.96, 140.48, 139.76, 140.86, 142.21, 141.76, 140.7, 140.42, 140.7, 139.79, 139.58, 141.03, 140.92, 140.41, 141.4, 142.37, 142.48],
 //  [8.69, 8.77, 8.86, 8.78, 8.78, 8.8, 8.85, 8.96, 9.14, 9.04, 9.04, 9.11, 9.17, 9.12, 9.09, 9.04, 9.05, 8.98, 8.94, 9.06, 9.14, 9.11, 9.12, 9.3, 9.22],
 //  [0.251, 0.2504, 0.2528, 0.2541, 0.254, 0.257, 0.26, 0.2625, 0.2611, 0.2631, 0.2677, 0.2738, 0.2755, 0.2724, 0.2704, 0.265, 0.2654, 0.2627, 0.2624, 0.2635, 0.2663, 0.2642, 0.2671, 0.2689, 0.2691],
 //  [0.3294, 0.3394, 0.3436, 0.3458, 0.3445, 0.3407, 0.3478, 0.3527, 0.3552, 0.3545, 0.3777, 0.3748, 0.373, 0.3761, 0.3697, 0.3582, 0.3598, 0.351, 0.3529, 0.3531, 0.3649, 0.3609, 0.3617, 0.3605, 0.3597],
 //  [68.77, 69.47, 71.02, 70.81, 71.12, 71.94, 72.73, 73.18, 72.93, 73.04, 72.61, 73.64, 74.62, 74.62, 74.1, 72.03, 72.26, 71.29, 71.52, 72.48, 73.18, 73.27, 73.03, 72.81, 73.01]
 //  ];


  filterString:string = '';

  constructor(private db: AngularFireDatabase, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getData();
    //this.uplaodCoinDataFromApi();
    //this.uplaodIcoDataFromApi();

    $( "#srch-term" ).keyup(() => {
        console.log($("#srch-term").val());

        this.filterString = $("#srch-term").val();

        if(this.filterString != "") {
          this.isSearching = true;
          setTimeout(()=>{
            this.pagination = false;
            var firstCapital = this.filterString.charAt(0).toUpperCase() + this.filterString.slice(1);
            var count = 0;
            var coinRef = firebase.database().ref('/CryptoCurrency/coin').orderByChild('name').startAt(firstCapital).limitToFirst(20).on("value", (snapshot) => {
              if (count < 10) {
                this.coinsList = [];
                this.coinsListId = [];
                var count_graphdata = 0;
                for (var key in snapshot.val()) {
                  firebase.database().ref('/CryptoCurrency/coin/' + key).once('value', snapshot2 => {
                    this.coinsList.push(snapshot2.val());
                    this.coinsListId.push(key);
                    this.sampleLineChartData[count_graphdata] = [];
                    this.getGraphData(snapshot2.val()['symbol'], count_graphdata);
                    count_graphdata++;
                    if(snapshot.numChildren() == count_graphdata){
                      this.isSearching = false;
                    }
                  });
                }
              }
            });
          },2000);
        }else{
          this.isSearching = false;
          this.pagination = true;
          this.getData();
        }




    });


    setInterval(()=>{
      this.lineChartData = this.sampleLineChartData;
      this.lineChartData = this.lineChartData.slice();
    },5000);




  }

  lineChartLabels:Array<any> = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00','07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
   lineChartType:string = 'line';

  lineChartOptions: any = {
    scales: {
      xAxes: [{
          display: false,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }]
      },
      legend: {
        display: false,
      },
      elements: { point: { radius: 0 } },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: { enabled: false }
    };

  public lineChartColorsRed:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,76,76,0.6)',
      borderColor: 'rgba(204,60,60,0.6)',
      pointBackgroundColor: 'rgba(219,118,118,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(255,76,76,0.6)',
      borderColor: 'rgba(204,60,60,0.6)',
      pointBackgroundColor: 'rgba(219,118,118,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(255,76,76,0.6)',
      borderColor: 'rgba(204,60,60,0.6)',
      pointBackgroundColor: 'rgba(219,118,118,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartColorsGreen:Array<any> = [
    { // grey
      backgroundColor: 'rgb(126,219,118,0.6)',
      borderColor: 'rgb(100,175,94,0.6)',
      pointBackgroundColor: 'rgb(118,150,115,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgb(126,219,118,0.6)',
      borderColor: 'rgb(100,175,94,0.6)',
      pointBackgroundColor: 'rgb(118,150,115,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgb(126,219,118,0.6)',
      borderColor: 'rgb(100,175,94,0.6)',
      pointBackgroundColor: 'rgb(118,150,115,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

   chartClicked(e:any):void {
  //  console.log(e);
  }

   chartHovered(e:any):void {
  //  console.log(e);
  }



  changePage(pageNum){
    if(pageNum == -1){
      this.currentPage = this.currentPage - 1;
      if(this.currentPage < 1){
        this.currentPage = 1;
      }
    }
    else if(pageNum == 6){
      this.currentPage = this.currentPage + 1;
      if(this.currentPage > 5){
        this.currentPage = 5;
      }
    }
    else {
      this.currentPage = pageNum;
    }
    this.getData();
  }


  getData(){
    this.currentEndValue = this.currentPage * 10;
    this.currentStartValue = this.currentEndValue - 9;



    var coinRef = firebase.database().ref('/CryptoCurrency/coin').orderByChild("rank").startAt(this.currentStartValue).endAt(this.currentEndValue).limitToFirst(150);
    coinRef.once('value', snapshot => {
      this.coinsList = [];
      this.coinsListId = [];
      console.log(snapshot.numChildren());
      var count_graphdata  = 0;
      for (var key in snapshot.val()) {
        firebase.database().ref('/CryptoCurrency/coin/'+key).once('value', snapshot2 => {
          this.coinsList.push(snapshot2.val());
          this.coinsListId.push(key);
          this.sampleLineChartData[count_graphdata] = [];
          this.getGraphData(snapshot2.val()['symbol'],count_graphdata);
          count_graphdata++;
        });
      }
    });




  }

  getGraphData(symbol,i){
    this.http.get("https://min-api.cryptocompare.com/data/histohour?fsym="+symbol+"&tsym=USD&limit=24").subscribe(data => {
      for (var key in data['Data']) {
        this.sampleLineChartData[i].push(data['Data'][key]['close']);
      }
    });
   }


  gotoCoinDetails(coinSymbol){
    this.router.navigate(['coin-details/' + coinSymbol]);
  }

  addCommas(inputString){
    return parseFloat(inputString).toLocaleString('en');
  }

  //DO NOT CALL THIS FUNCTION UNTILL ALL OF THE DEVELOPERS ARE ONBOARD AND INFORMED AS THIS MAY HAYWIRE FIREBASE COINS LIST (example: 1500 + 1500 + ... + n-times)
  newCoin: any;
  uplaodCoinDataFromApi(){
    //firebase.database().ref('/CryptoCurrency/coin/').remove();
     this.http.get("https://api.coinmarketcap.com/v1/ticker/?start=0&limit=1500&convert=EUR").subscribe(data => {
        for (var key in data) {
          var imageUrl = "https://chasing-coins.com/api/v1/std/logo/"+data[key]['symbol'];
          this.newCoin = {
            price_btc: data[key]['price_btc'],
            volume_usd_24h: data[key]['24h_volume_usd'],
            total_supply:  data[key]['total_supply'],
            max_supply:  data[key]['max_supply'],
            available_supply : data[key]['available_supply'],
            id:  data[key]['id'],
            market_cap_eur:  data[key]['market_cap_eur'],
            market_cap_usd:  data[key]['market_cap_usd'],
            name:  data[key]['name'],
            percent_change_1h: data[key]['percent_change_1h'],
            percent_change_24h:  data[key]['percent_change_24h'],
            percent_change_7d:  data[key]['percent_change_7d'],
            price_eur:  data[key]['price_eur'],
            price_usd:  data[key]['price_usd'],
            rank:  parseInt(data[key]['rank']),
            symbol:  data[key]['symbol'],
            volume_eur:  data[key]['24h_volume_eur'],
            volume_usd:  data[key]['24h_volume_usd'],
            image_url:  imageUrl
          };
          firebase.database().ref('/CryptoCurrency/coin/').push(this.newCoin);
          //console.log(this.newCoin)
        }
      });
  }
  newIco: any;
  count: any = 1;
  uplaodIcoDataFromApi(){
    firebase.database().ref('/ICO/All ICO/allico/').remove();

    this.http.get("https://api.icowatchlist.com/public/v1/").subscribe(data => {
      //console.log(data["ico"]["live"][0].description);

      for (var key in data["ico"]["live"]) {
     //   console.log(key);
        this.newIco = {
            "description" : data["ico"]["live"][key].description,
            "end_time" : data["ico"]["live"][key].end_time,
            "icowatchlist_url" : data["ico"]["live"][key].icowatchlist_url,
            "image" : data["ico"]["live"][key].image,
            "name" : data["ico"]["live"][key].name,
            "start_time" : data["ico"]["live"][key].start_time,
            "timezone" : data["ico"]["live"][key].timezone,
            "website_link" : data["ico"]["live"][key].website_link,

            "status" : "live",

            "video_url": '',
            "faccebook_url": '',
            "twitter_url": '',
            "github_url": '',
            "reddit_url": '',
            "medium_url": '',
            "paperplane_url": '',

            "live" : "1",
            "featured": "0",
            "goal": "999",
            "approved": "1",
            "token": "pending",
            "price": "pending",
            "bounty": "pending",
            "platform": "pending",
            "accepting": "pending",
            "softcap": "pending",
            "country": "pending",
            "whitelist": "pending",
            "restricted_area": "pending",
            "about": "lorem ispam",
            "team": "lorem ispam",
            "milestones": "lorem ispam",
            "financials": "lorem ispam",
            "rating": "lorem ispam",
            "white_paper": "lorem ispam",
            "count" : this.count
        };
        firebase.database().ref('/ICO/All ICO/allico/').push(this.newIco);
        this.count++;
      }


      for (var key in data["ico"]["finished"]) {
      //  console.log(key);
        this.newIco = {
          "description" : data["ico"]["finished"][key].description,
          "end_time" : data["ico"]["finished"][key].end_time,
          "icowatchlist_url" : data["ico"]["finished"][key].icowatchlist_url,
          "image" : data["ico"]["finished"][key].image,
          "name" : data["ico"]["finished"][key].name,
          "start_time" : data["ico"]["finished"][key].start_time,
          "timezone" : data["ico"]["finished"][key].timezone,
          "website_link" : data["ico"]["finished"][key].website_link,

          "status" : "finished",

          "video_url": '',
          "faccebook_url": '',
          "twitter_url": '',
          "github_url": '',
          "reddit_url": '',
          "medium_url": '',
          "paperplane_url": '',


          "live" : "1",
          "featured": "0",
          "goal": "999",
          "approved": "0",
          "token": "pending",
          "price": "pending",
          "bounty": "pending",
          "platform": "pending",
          "accepting": "pending",
          "softcap": "pending",
          "country": "pending",
          "whitelist": "pending",
          "restricted_area": "pending",
          "about": "lorem ispam",
          "team": "lorem ispam",
          "milestones": "lorem ispam",
          "financials": "lorem ispam",
          "rating": "lorem ispam",
          "white_paper": "lorem ispam",
          "count" : this.count
        };
        firebase.database().ref('/ICO/All ICO/allico/').push(this.newIco);
        this.count++;
      }




    });
  }


}
