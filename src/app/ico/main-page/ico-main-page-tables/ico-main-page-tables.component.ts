import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-ico-main-page-tables',
  templateUrl: './ico-main-page-tables.component.html',
  styleUrls: ['./ico-main-page-tables.component.css']
})
export class IcoMainPageTablesComponent implements OnInit {

  icoList: any = [];
  icoListId: any;
  icoRatingListConcept: any = [0,0,0,0,0,0,0];
  icoRatingListTeam: any = [0,0,0,0,0,0,0];
  icoRatingListWhitepaper: any = [0,0,0,0,0,0,0];
  icoRatingListTotalCount: any = [0,0,0,0,0,0,0];

  currentPage: number = 1;
  currentStartValue: number = 1;
  currentEndValue: number = 5;

  ratingCounter: number = 0;

  constructor(private db: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
    this.getData();
    //this.getIcoConcept("-LAEVfUtJ8dE5sLhIZQo");
  }

  getData(){
    var coinRef = firebase.database().ref('/ICO/All ICO/allico/').orderByChild("approved").equalTo("1").limitToFirst(5);
    coinRef.on('value', snapshot => {
      this.icoList = [];
      this.icoListId = [];
     // console.log(snapshot.numChildren());
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

  getRatingConcept(id,index){
    // var icoId = "-LAEVfUtJ8dE5sLhIZQo";

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


  gotoIcoDetails(id){
    this.router.navigate(['ico/ico-details/' + this.icoListId[id]]);
  }


  getIcoConcept(id){
//     var countEnd = '0';
//     var ratingRef = firebase.database().ref('/User/Rating/').orderByChild('icoId').equalTo( this.icoListId[id]);
// if(countEnd != 'azeem') {
//   ratingRef.once('value', snapshot3 => {
//     var numList1 = snapshot3.numChildren();
//     var current = 0;
//     console.log("here1");
//     for (var key2 in snapshot3.val()) {
//       var totalConcept = 0;
//       var totalTeam = 0;
//       var totalWhitepaper = 0;
//       var totalCount = 1;
//       firebase.database().ref('/User/Rating/' + key2).once('value', snapshot4 => {
//         console.log("here4");
//         totalCount++;
//         totalConcept += parseFloat(snapshot4.val()['Concept']);
//         totalTeam += parseFloat(snapshot4.val()['Team']);
//         totalWhitepaper += parseFloat(snapshot4.val()['Whitepaper']);
//         current++;
//         console.log("curr: " + current + " list: " + numList1);
//
//         if (numList1 == current) {
//           countEnd = 'azeem';
//           return ((totalConcept / (totalCount - 1)));
//         }
//
//
//       });
//     }
//     //noinspection JSAnnotator
//
//
//   });
// }
  }


}
