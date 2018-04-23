import {Component, OnInit, ViewContainerRef} from '@angular/core';
import * as $ from 'jquery';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {ToastsManager} from 'ng2-toastr';
import {AngularFireStorage} from 'angularfire2/storage';

@Component({
  selector: 'app-publish-ico',
  templateUrl: './publish-ico.component.html',
  styleUrls: ['./publish-ico.component.css']
})
export class PublishIcoComponent implements OnInit {

  count: number = 0;

  icoName: string = '';
  websiteUrl: string = '';
  about: string = '';
  socialMediaLinks: string = '';
  country: string = '';
  startDate: string = '';
  endDate: string = '';
  whitepaper: string = '';
  watchlist: string = '';
  bounty: string = '';
  token: string = '';
  platform: string = '';
  whitelist: string = '';
  restriction: string = '';
  email: string = '';
  description: string = '';
  emailPreferance: string = '';

  art: boolean = false;
  ai: boolean = false;
  banking: boolean = false;
  bigdata: boolean = false;
  buissnessServices: boolean = false;
  casino: boolean = false;
  manufacturing: boolean = false;
  media: boolean = false;
  sports: boolean = false;
  charity: boolean = false;
  communication: boolean = false;
  cryptocurrency: boolean = false;
  education: boolean = false;
  electronics: boolean = false;
  energy: boolean = false;
  platform_cat: boolean = false;
  realstate: boolean = false;
  tourism: boolean = false;
  entertainment: boolean = false;
  health: boolean = false;
  infrastructure: boolean = false;
  internet: boolean = false;
  investment: boolean = false;
  legal: boolean = false;
  smartContract: boolean = false;
  software: boolean = false;
  virtualReality: boolean = false;

  imageUrl: string = '';
  file: any;

  icoData: any = {
    name: this.icoName,
    website_link: this.websiteUrl,
    about: this.about,
    socialMediaLinks: this.socialMediaLinks,
    country: this.country,
    start_time: this.startDate,
    end_time: this.endDate,
    white_paper: this.whitepaper,
    icowatchlist_url: this.watchlist,
    bounty: this.bounty,
    token: this.token,
    platform: this.platform,
    whitelist: this.whitelist,
    restricted_area: this.restriction,
    email: this.email,
    description: this.description,
    emailPreferance: this.emailPreferance,

    art: this.art,
    ai: this.ai,
    banking: this.banking,
    bigdata: this.bigdata,
    buissnessServices: this.buissnessServices,
    casino: this.casino,
    manufacturing: this.manufacturing,
    media: this.media,
    sports: this.sports,
    charity: this.charity,
    communication: this.communication,
    cryptocurrency: this.cryptocurrency,
    education: this.education,
    electronics: this.electronics,
    energy: this.energy,
    platform_cat: this.platform,
    realstate: this.realstate,
    tourism: this.tourism,
    entertainment: this.entertainment,
    health: this.health,
    infrastructure: this.infrastructure,
    internet: this.internet,
    investment: this.investment,
    legal: this.legal,
    smartContract: this.smartContract,
    software: this.software,
    virtualReality: this.virtualReality
  };



  constructor(private db: AngularFireDatabase, public router: Router,  public toastr: ToastsManager, vcr: ViewContainerRef, private afStorage: AngularFireStorage) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if(localStorage.getItem("bit")){
      if(localStorage.getItem("bit") == "1"){

      }
      else{
        this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
      }
    }
    else{
      this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
    }
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  next(pageNum){
    console.log(this.file);
    if(pageNum == 1){
      if(localStorage.getItem("bit")){
        if(localStorage.getItem("bit") == "1"){
          $('#profileLink').removeClass("active");
          $('#homeLink').removeClass("active");
          $('#messagesLink').removeClass("active");

          $('#profile').removeClass("active");
          $('#home').removeClass("active");
          $('#messages').removeClass("active");

          $('#profileLink').addClass( "active" );
          $('#profile').addClass( "active" );
          $('#progress-bar').css("width","66.66%");
        }
        else{
          this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
        }
      }
      else{
        this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
      }
    }else if(pageNum == 2){
      $('#profileLink').removeClass("active");
      $('#homeLink').removeClass("active");
      $('#messagesLink').removeClass("active");

      $('#profile').removeClass("active");
      $('#home').removeClass("active");
      $('#messages').removeClass("active");

      $('#messagesLink').addClass( "active" );
      $('#messages').addClass( "active" );
      $('#progress-bar').css("width","99.99%");
    }else if(pageNum == 3){

      //console.log(this.icoData);
      if(this.file == '' || this.file == undefined){
        this.toastr.error("No image selected!", 'Error!');
      }else{
        firebase.storage().ref().child('ico-images/'+this.makeid()+'.png').put(this.file).then(snapshot => {
          this.imageUrl = snapshot.downloadURL;

          firebase.database().ref('/ICO/All ICO/allico').orderByChild("count").limitToLast(1).once("child_added", (snapshot2)=> {
            this.count = snapshot2.val().count;

            this.icoData = {
              name: this.icoName,
              website_link: this.websiteUrl,
              about: this.about,
              socialMediaLinks: this.socialMediaLinks,
              country: this.country,
              start_time: this.startDate,
              end_time: this.endDate,
              white_paper: this.whitepaper,
              icowatchlist_url: this.watchlist,
              bounty: this.bounty,
              token: this.token,
              platform: this.platform,
              whitelist: this.whitelist,
              restricted_area: this.restriction,
              email: this.email,
              description: this.description,
              emailPreferance: this.emailPreferance,

              art: this.art,
              ai: this.ai,
              banking: this.banking,
              bigdata: this.bigdata,
              buissnessServices: this.buissnessServices,
              casino: this.casino,
              manufacturing: this.manufacturing,
              media: this.media,
              sports: this.sports,
              charity: this.charity,
              communication: this.communication,
              cryptocurrency: this.cryptocurrency,
              education: this.education,
              electronics: this.electronics,
              energy: this.energy,
              platform_cat: this.platform,
              realstate: this.realstate,
              tourism: this.tourism,
              entertainment: this.entertainment,
              health: this.health,
              infrastructure: this.infrastructure,
              internet: this.internet,
              investment: this.investment,
              legal: this.legal,
              smartContract: this.smartContract,
              software: this.software,
              virtualReality: this.virtualReality,
              image: this.imageUrl,

              count: this.count+1
            };
            firebase.database().ref('/ICO/All ICO/allico').push(this.icoData).then(data=>{
              this.toastr.success("ICO Published!", 'Success!');
           //   console.log(this.icoData);
              setTimeout(()=>{this.router.navigate(["ico"])},2000);
            });
          });


        });
      }


    }
  }

  uploadFile(event) {
    this.file = event.srcElement.files[0];
  }

  goBack(pageNum){
    if(pageNum == 2){
      $('#profileLink').removeClass("active");
      $('#homeLink').removeClass("active");
      $('#messagesLink').removeClass("active");

      $('#profile').removeClass("active");
      $('#home').removeClass("active");
      $('#messages').removeClass("active");

      $('#homeLink').addClass( "active" );
      $('#home').addClass( "active" );
      $('#progress-bar').css("width","33.33%");
    }else if(pageNum == 3){
      $('#profileLink').removeClass("active");
      $('#homeLink').removeClass("active");
      $('#messagesLink').removeClass("active");

      $('#profile').removeClass("active");
      $('#home').removeClass("active");
      $('#messages').removeClass("active");

      $('#progress-bar').css("width","66.66%");
      $('#profileLink').addClass( "active" );
      $('#profile').addClass( "active" );
    }
  }


}
