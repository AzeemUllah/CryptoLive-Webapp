import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import * as $ from 'jquery';

@Component({
  selector: 'app-ico-main-page-ico-listing',
  templateUrl: './ico-main-page-ico-listing.component.html',
  styleUrls: ['./ico-main-page-ico-listing.component.css']
})
export class IcoMainPageIcoListingComponent implements OnInit {

  icoList: any;
  icoListId: any;

  filterString: string = '';

  currentStartValue: number = 1;
  currentEndValue: number = 5;

  icoRatingListConcept: any = [0,0,0,0,0,0,0];
  icoRatingListTeam: any = [0,0,0,0,0,0,0];
  icoRatingListWhitepaper: any = [0,0,0,0,0,0,0];
  icoRatingListTotalCount: any = [0,0,0,0,0,0,0];
  ratingCounter: number = 0;

  @Input() set searchElement(searchElement: string) {
    this.filterString = searchElement;

    if(this.filterString == ''){
      this.ratingCounter =0;
      $("#two-tables").removeClass("fadeOut");
      $("#planning-ico").removeClass("fadeOut");

      $("#two-tables").addClass("fadeIn");
      $("#planning-ico").addClass("fadeIn");

      $("#planning-ico").css("display", "block");
      $("#two-tables").css("display", "block");

      var coinRef = firebase.database().ref('/ICO/All ICO/allico/').orderByChild("count").startAt(this.currentStartValue).endAt(this.currentEndValue);
      coinRef.on('value', snapshot => {
        this.icoList = [];
        this.icoListId = [];
        for (var key in snapshot.val()) {
          firebase.database().ref('/ICO/All ICO/allico/'+key).on('value', snapshot2 => {
            this.icoList.push(snapshot2.val());
            this.icoListId.push(key);
            this.getRatingConcept(key,this.ratingCounter);
            this.ratingCounter++;
          });
        }
      });
    }
    else {
      this.ratingCounter =0;
      $("#two-tables").addClass("fadeOut");
      $("#planning-ico").addClass("fadeOut");

      $("#two-tables").removeClass("fadeIn");
      $("#planning-ico").removeClass("fadeIn");

      setTimeout(()=>{
        $("#planning-ico").css("display", "none");
        $("#two-tables").css("display", "none");
      },1000);


      var count = 0;
      var coinRef2 = firebase.database().ref('/ICO/All ICO/allico/');
      coinRef2.once('value', snapshot => {
        this.icoList = [];
        this.icoListId = [];
        for (var key in snapshot.val()) {
          firebase.database().ref('/ICO/All ICO/allico/' + key).on('value', snapshot2 => {
            if((((snapshot2.val().name).toLowerCase()).match((this.filterString).toLowerCase())) && count < 5){
              this.icoList.push(snapshot2.val());
              this.icoListId.push(key);
              count++;
              this.getRatingConcept(key,this.ratingCounter);
              this.ratingCounter++;
            }
          });
        }
      });
    }
  }

  constructor(private db: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
  //  console.log(new Date());
  }

  getRatingConcept(id,index){
    var ratingRef = firebase.database().ref('/User/Rating/').orderByChild('icoId').equalTo(id);
    ratingRef.once('value', snapshot3 => {
      if(snapshot3.val() == null){
        this.icoRatingListConcept[index] = 0;
      }
      else{
        var totalConcept = 0;
        var totalTeam = 0;
        var totalWhitepaper = 0;
        var totalCount = 1;
        this.icoRatingListTotalCount[index] = 1;
        for (var key2 in snapshot3.val()) {
          firebase.database().ref('/User/Rating/' + key2).once('value', snapshot4 => {
            totalCount++;
         //   console.log(this.icoRatingListTotalCount[index] + " " + index);
            this.icoRatingListConcept[index] += parseFloat(snapshot4.val()['Concept']);
            this.icoRatingListTeam[index] += parseFloat(snapshot4.val()['Team']);
            this.icoRatingListWhitepaper[index] += parseFloat(snapshot4.val()['Whitepaper']);
            this.icoRatingListTotalCount[index]++;
          });
        //  console.log(this.icoRatingListConcept);
        }
      }
    });
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

  gotoIcoDetails(id){
    this.router.navigate(['ico/ico-details/' + this.icoListId[id]]);
  }

  countTotalrating(id){
    var totalConcept = 0;
    var totalTeam = 0;
    var totalWhitepaper = 0;

    // var occuranceFive = 0;
    // var occuranceFour = 0;
    // var occuranceThree = 0;
    // var occuranceTwo = 0;
    // var occuranceOne = 0;
    //
    var totalCount = 1;


    var ratingRef = firebase.database().ref('/User/Rating/').orderByChild('icoId').equalTo(this.icoListId[id]);
    ratingRef.once('value', snapshot => {
      if (snapshot.val()) {

        for (var key in snapshot.val()) {
          firebase.database().ref('/User/Rating/'+key).once('value', snapshot2 => {
            if(snapshot2.val()['icoId'] == this.icoListId[id]) {
              totalCount++;

              totalConcept += parseFloat(snapshot2.val()['Concept']);
              totalTeam += parseFloat(snapshot2.val()['Team']);
              totalWhitepaper += parseFloat(snapshot2.val()['Whitepaper']);



              //
              // if(parseInt(snapshot2.val()['Whitepaper']) == 5){
              //   occuranceFive++;
              // }
              // else if(parseInt(snapshot2.val()['Whitepaper']) == 4){
              //   occuranceFour++;
              // }
              // else if(parseInt(snapshot2.val()['Whitepaper']) == 3){
              //  occuranceThree++;
              // }
              // else if(parseInt(snapshot2.val()['Whitepaper']) == 2){
              //   occuranceTwo++;
              // }
              // else if(parseInt(snapshot2.val()['Whitepaper']) == 1){
              //   occuranceOne++;
              // }
              //
              // if(parseInt(snapshot2.val()['Team']) == 5){
              //   occuranceFive++;
              // }
              // else if(parseInt(snapshot2.val()['Team']) == 4){
              //   occuranceFour++;
              // }
              // else if(parseInt(snapshot2.val()['Team']) == 3){
              //   occuranceThree++;
              // }
              // else if(parseInt(snapshot2.val()['Team']) == 2){
              // occuranceTwo++;
              // }
              // else if(parseInt(snapshot2.val()['Team']) == 1){
              //  occuranceOne++;
              // }
              //
              //
              // if(parseInt(snapshot2.val()['Concept']) == 5){
              //   occuranceFive++;
              // }
              // else if(parseInt(snapshot2.val()['Concept']) == 4){
              //   occuranceFour++;
              // }
              // else if(parseInt(snapshot2.val()['Concept']) == 3){
              //   occuranceThree++;
              // }
              // else if(parseInt(snapshot2.val()['Concept']) == 2){
              //   occuranceTwo++;
              // }
              // else if(parseInt(snapshot2.val()['Concept']) == 1){
              //   occuranceOne++;
              // }

            }

          });
        }
        return ((totalConcept+totalTeam+totalWhitepaper)/(totalCount*3)).toFixed(1);
      }
      else{
        return 0.0;
      }
    });
  }




}
