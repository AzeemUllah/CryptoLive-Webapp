import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as firebase from "firebase";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-ico-details-top-header',
  templateUrl: './ico-details-top-header.component.html',
  styleUrls: ['./ico-details-top-header.component.css']
})
export class IcoDetailsTopHeaderComponent implements OnInit {

  id: string = '';
  icoDetails: any = {
    name: '',
    image: '',
    description: ''
  };



  totalConcept: number = 0;
  totalTeam: number = 0;
  totalWhitepaper: number = 0;

  occuranceFive: number = 0;
  occuranceFour: number = 0;
  occuranceThree: number = 0;
  occuranceTwo: number = 0;
  occuranceOne: number = 0;

  totalCount: number = 1;


  constructor(private db: AngularFireDatabase, public router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params.id;
      this.getIcoDetails();
      window.scrollTo(0, 0);

      var ratingRef = firebase.database().ref('/User/Rating/').orderByChild('icoId').equalTo(this.id);
      ratingRef.once('value', snapshot => {
        if (snapshot.val()) {
          for (var key in snapshot.val()) {
            firebase.database().ref('/User/Rating/'+key).once('value', snapshot2 => {
              if(snapshot2.val()['icoId'] == this.id) {
                this.totalCount++;

                this.totalConcept += parseFloat(snapshot2.val()['Concept']);
                this.totalTeam += parseFloat(snapshot2.val()['Team']);
                this.totalWhitepaper += parseFloat(snapshot2.val()['Whitepaper']);



                if(parseInt(snapshot2.val()['Whitepaper']) == 5){
                  this.occuranceFive++;
                }
                else if(parseInt(snapshot2.val()['Whitepaper']) == 4){
                  this.occuranceFour++;
                }
                else if(parseInt(snapshot2.val()['Whitepaper']) == 3){
                  this.occuranceThree++;
                }
                else if(parseInt(snapshot2.val()['Whitepaper']) == 2){
                  this.occuranceTwo++;
                }
                else if(parseInt(snapshot2.val()['Whitepaper']) == 1){
                  this.occuranceOne++;
                }

                if(parseInt(snapshot2.val()['Team']) == 5){
                  this.occuranceFive++;
                }
                else if(parseInt(snapshot2.val()['Team']) == 4){
                  this.occuranceFour++;
                }
                else if(parseInt(snapshot2.val()['Team']) == 3){
                  this.occuranceThree++;
                }
                else if(parseInt(snapshot2.val()['Team']) == 2){
                  this.occuranceTwo++;
                }
                else if(parseInt(snapshot2.val()['Team']) == 1){
                  this.occuranceOne++;
                }


                if(parseInt(snapshot2.val()['Concept']) == 5){
                  this.occuranceFive++;
                }
                else if(parseInt(snapshot2.val()['Concept']) == 4){
                  this.occuranceFour++;
                }
                else if(parseInt(snapshot2.val()['Concept']) == 3){
                  this.occuranceThree++;
                }
                else if(parseInt(snapshot2.val()['Concept']) == 2){
                  this.occuranceTwo++;
                }
                else if(parseInt(snapshot2.val()['Concept']) == 1){
                  this.occuranceOne++;
                }

           //   console.log(this.totalConcept + " " + this.totalTeam + " " + this.totalWhitepaper + " / " + this.totalCount  );
              }
            });
          }
        }
      });

    });
  }

  getIcoDetails(){
    var coinRef = firebase.database().ref('/ICO/All ICO/allico/'+this.id);
    coinRef.on('value', snapshot => {
      this.icoDetails = snapshot.val();
    });
  }

  calculateTotalRating(){
    var num = ((this.totalConcept+this.totalTeam+this.totalWhitepaper)/((this.totalCount-1)*3)).toFixed(1);
    if(num != "NaN"){
     return ((this.totalConcept+this.totalTeam+this.totalWhitepaper)/((this.totalCount-1)*3)).toFixed(1);
    }else{
      return 0.0;
    }
  }

  countDown_days(date_future){
    var countDownDate = new Date(date_future).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      return 0;
    }
    return days;
  }

  countDown_hours(date_future){
    var countDownDate = new Date(date_future).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      return 0;
    }
    return hours;
  }

  countDown_minutes(date_future){
    var countDownDate = new Date(date_future).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      return 0;
    }
    return minutes;
  }
  countDown_seconds(date_future){
    var countDownDate = new Date(date_future).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      return 0;
    }
    return seconds;
  }
}
