import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {ActivatedRoute} from "@angular/router";
import * as firebase from "firebase";
import * as $ from "jquery";



@Component({
  selector: 'app-ico-details-description',
  templateUrl: './ico-details-description.component.html',
  styleUrls: ['./ico-details-description.component.css']
})
export class IcoDetailsDescriptionComponent implements OnInit {

  id: string = '';
  icoDetails: any = {
    about: '',
    team: '',
    milestone: '',
    financials: '',
    rating: '',
    whitepaper: '',
    name: ''
  };

  icoRatingUser: any = {
    approved: "0",
    comment: "",
    Concept:"",
    icoName: "",
    Team: "",
    uid:"",
    Whitepaper:"",
    icoId: ""
  };

  icoRatingId: string = '';
  uid: string = '';

  isRated: boolean = true;

  isLoggedIn: boolean = false;

  // isAdded: boolean = false;


  constructor(private db: AngularFireDatabase, public router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params.id;
      this.getIcoDetails();
      window.scrollTo(0, 0);
      this.getIcoUserRating();
    });


    setInterval(()=>{
      if(localStorage.getItem("bit") == '1'){
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
      }
    },2500);


  }

  getIcoDetails(){
    var coinRef = firebase.database().ref('/ICO/All ICO/allico/'+this.id);
    coinRef.on('value', snapshot => {
      this.icoDetails = snapshot.val();
    });
  }

  getIcoUserRating(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = firebase.auth().currentUser.uid;
        var ratingRef = firebase.database().ref('/User/Rating/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid);
        ratingRef.once('value', snapshot => {
          if (snapshot.val()) {
            for (var key in snapshot.val()) {
              firebase.database().ref('/User/Rating/'+key).once('value', snapshot2 => {
                if(snapshot2.val()['icoId'] == this.id) {
                  this.icoRatingId = key;
                  this.icoRatingUser = snapshot2.val();
                  if(!(snapshot2.val()['Concept'] == "" || snapshot2.val()['Team'] == "" || snapshot2.val()['Whitepaper'] == "")){
                    this.isRated = true;
                  }
                }
                else{
                  this.isRated = false;
                }
              });
            }
          }
          else {
            this.icoRatingId = '';
            this.isRated = false;
          }

        });
      }
    });
  }

  checked(category,value){
    var count = 0;

    if(category == "team"){
      this.icoRatingUser.Team = value;
    }else if(category == "concept"){
      this.icoRatingUser.Concept = value;
    }else if(category == "whitepaper"){
      this.icoRatingUser.Whitepaper = value;
    }

    if(this.icoRatingUser.Whitepaper != '' && this.icoRatingUser.Concept != '' && this.icoRatingUser.Team != ''){
      this.icoRatingUser.uid = this.uid;
      this.icoRatingUser.icoId = this.id;
      this.icoRatingUser.icoName = this.icoDetails.name;
      firebase.database().ref('/User/Rating/').push(this.icoRatingUser).then(data=>{
        this.getIcoUserRating();
      });
    }


        // var ratingRef = firebase.database().ref('/User/Rating/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid);
        // ratingRef.once('value', snapshot => {
        //   console.log("here1");
        //   console.log(snapshot.val());
        //   if (snapshot.val()) {
        //     for (var key in snapshot.val()) {
        //       console.log("here2");
        //
        //       firebase.database().ref('/User/Rating/'+key).once('value', snapshot2 => {
        //         console.log("here3");
        //         if(snapshot2.val()['icoId'] == this.id) {
        //           console.log("here4");
        //           this.isAdded = true;
        //           firebase.database().ref('/User/Rating/'+key).update(this.icoRatingUser).then(data=>{
        //             this.getIcoUserRating();
        //
        //           });
        //         }
        //         count++;
        //         console.log(count + " " + snapshot.numChildren() + " " + this.isAdded);
        //         console.log(this.icoRatingUser);
        //         if(count == snapshot.numChildren() && this.isAdded == false){
        //           firebase.database().ref('/User/Rating/').push(this.icoRatingUser).then(data=>{
        //             this.getIcoUserRating();
        //             this.isAdded = true;
        //           });
        //         }
        //       });
        //
        //     }
        //   }
        //   else{
        //     this.icoRatingUser.uid = this.uid;
        //     this.icoRatingUser.icoId = this.id;
        //     this.icoRatingUser.icoName = this.icoDetails.name;
        //
        //     firebase.database().ref('/User/Rating/').push(this.icoRatingUser).then(data=>{
        //       this.getIcoUserRating();
        //     });
        //   }
        // });


    // if(this.icoRatingId){
    //     firebase.database().ref('/User/Rating/'+this.icoRatingId).remove();
    //     this.icoRatingUser.uid = this.uid;
    //     this.icoRatingUser.icoId = this.id;
    //     this.icoRatingUser.icoName = this.icoDetails.name;
    //
    //     firebase.database().ref('/User/Rating/').push(this.icoRatingUser).then(data=>{
    //       this.getIcoUserRating();
    //     });
    //     // firebase.database().ref('/User/Rating/'+this.icoRatingId).set(this.icoRatingUser).then(data=>{
    //     //   this.getIcoUserRating();
    //     // });
    // }
    // else{
    //     this.icoRatingUser.uid = this.uid;
    //     this.icoRatingUser.icoId = this.id;
    //     this.icoRatingUser.icoName = this.icoDetails.name;
    //
    //     firebase.database().ref('/User/Rating/').push(this.icoRatingUser).then(data=>{
    //       this.getIcoUserRating();
    //     });
    // }




  }



}
