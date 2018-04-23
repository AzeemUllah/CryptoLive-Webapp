import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {ToastsManager} from "ng2-toastr";
import * as $ from 'jquery';

@Component({
  selector: 'app-top-baner',
  templateUrl: './top-baner.component.html',
  styleUrls: ['./top-baner.component.css']
})
export class TopBanerComponent implements OnInit {

  signupUserEmail: string = '';
  signupUserPassword: string = '';

  feturedList: any = [];
  feturedListId: any = [];

  bit: string = '0';

  constructor(private db: AngularFireDatabase, public router: Router,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    var feturedIcoRef = firebase.database().ref('/ICO/All ICO/allico/').orderByChild("featured").equalTo("1");
    feturedIcoRef.on('value', snapshot => {
      this.feturedList = [];
      this.feturedListId = [];
      for (var key in snapshot.val()) {
        firebase.database().ref('/ICO/All ICO/allico/'+key).on('value', snapshot2 => {
          this.feturedList.push(snapshot2.val());
          this.feturedListId.push(key);
        });
      }
    });
    if(localStorage.getItem("bit")) {
      this.bit = localStorage.getItem("bit");
    }
    setInterval(()=>{
      if(localStorage.getItem("bit")) {
        this.bit = localStorage.getItem("bit");
      }
    }, 1000);




  }



  register(){
    firebase.auth().createUserWithEmailAndPassword(this.signupUserEmail, this.signupUserPassword).then((data)=>{
      firebase.database().ref('/User/Profiles/').push({
        email: this.signupUserEmail,
        uid: data.uid,
        is_allowed: "0"
      }).then(data => {
        this.toastr.success("Signup Sucessfull!", 'Sucess!');
        $(".close").click();
      });
    }).catch((error) => {
      this.toastr.error(error.message, 'Error!');
    });
  }

  facebookAuthSignup(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      firebase.database().ref('/User/Profiles/').orderByChild('email').equalTo(result.user.email).once("value", (snapshot) => {
      //  console.log(snapshot.val());
        if(snapshot.val() == null){
          firebase.database().ref('/User/Profiles/').push({
            email: result.user.email,
            name: result.user.displayName,
            uid: result.user.uid,
            is_allowed: "0"
          }).then(data => {
            this.toastr.success("Signup Sucessfull!", 'Sucess!');
          });
        }else{
          this.toastr.error("Account already exists!", 'Error!');
        }
      });
    }).catch((error) => {
      var errorMessage = error.message;
      this.toastr.error(errorMessage, 'Error!');
    });
  }

  gotoIco(id){
    this.router.navigate(['ico/ico-details/'+this.feturedListId[id]] );
  }

  gotoMarket(){
    this.router.navigate(['']);
  }

  gotoCrypto(){
    this.router.navigate(['ico']);
  }

  gotoAbout(){
    this.router.navigate(['about']);
  }

  gotoPublish(){
    this.router.navigate(['ico/publish-ico']);
  }


}
