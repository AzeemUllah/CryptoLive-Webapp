import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {ToastsManager} from 'ng2-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signupUserEmail: string = '';
  signupUserPassword: string = '';

  loginUserEmail: string = '';
  loginUserPassword: string = '';

  bit: string = '0';

  constructor(private db: AngularFireDatabase, public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if(localStorage.getItem("bit")) {
      this.bit = localStorage.getItem("bit");
    }
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.loginUserEmail, this.loginUserPassword)
      .then(data=>{
        this.toastr.success('Login Successful!', 'Success!');
        localStorage.setItem("bit","1");
        this.bit = "1";
        $(".close").click();
      })
      .catch((error) => {
        var errorMessage = error.message;
        this.toastr.error(errorMessage, 'Error!');
      });
  }

  facebookAuthSignin(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      firebase.database().ref('/User/Profiles/').orderByChild('email').equalTo(result.user.email).once("value", (snapshot) => {
        if(snapshot.val() == null){
          this.toastr.error("No account associated with this facebook account.\nPlease sign up.", 'Error!');
        }
        else{
          this.toastr.success('Login Successful!', 'Success!');
          localStorage.setItem("bit","1");
          this.bit = "1";
          $(".close").click();
        }
      });
    }).catch((error) => {
      var errorMessage = error.message;
      this.toastr.error(errorMessage, 'Error!');
    });
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
       // console.log(snapshot.val());
        if(snapshot.val() == null){
          firebase.database().ref('/User/Profiles/').push({
            email: result.user.email,
            name: result.user.displayName,
            uid: result.user.uid,
            is_allowed: "0"
          }).then(data => {
            this.toastr.success("Signup Sucessfull!", 'Sucess!');
            $(".close").click();
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

  logout(){
    localStorage.setItem("bit","0");
    this.bit = "0";
    this.toastr.success("Logout Sucessfull!", 'Sucess!');
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
