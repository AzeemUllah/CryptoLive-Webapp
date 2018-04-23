import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import * as $ from 'jquery';


@Component({
  selector: 'app-ico-main-page-top-cards',
  templateUrl: './ico-main-page-top-cards.component.html',
  styleUrls: ['./ico-main-page-top-cards.component.css']
})
export class IcoMainPageTopCardsComponent implements OnInit {


  ongoing: number = 0;
  finished: number = 0;
  all: number = 0;


  constructor(private db: AngularFireDatabase, public router: Router) {

  }

  ngOnInit() {
    this.getData();

  }



  getData(){
    var icoRef = firebase.database().ref('/ICO/All ICO/allico/');
    icoRef.on('value', snapshot => {
      this.all = snapshot.numChildren();
    });
    var icoRef2 = firebase.database().ref('/ICO/All ICO/allico/').orderByChild('status').equalTo('live');
    icoRef2.on('value', snapshot => {
      this.ongoing = snapshot.numChildren();
    });
    var icoRef3 = firebase.database().ref('/ICO/All ICO/allico/').orderByChild('status').equalTo('finished');
    icoRef3.on('value', snapshot => {
      this.finished = snapshot.numChildren();
    });
  }

  gotoIcoDetails(id){
  //  console.log(id);
  }

}
