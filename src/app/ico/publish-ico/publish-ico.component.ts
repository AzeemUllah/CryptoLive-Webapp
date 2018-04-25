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
  // socialMediaLinks: string = '';

  facebook: string = '';
  twitter: string = '';
  medium: string = '';
  github: string = '';
  reddit: string = '';
  paperPlane: string = '';

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

  isSaving: boolean = false;

  icoData: any = {
    name: this.icoName,
    approved: "0",
    website_link: this.websiteUrl,
    about: this.about,
    // socialMediaLinks: this.socialMediaLinks,
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
        $('#search-overlay').fadeOut();
        $('#search-btn').show();
      }
      else{
        $(this).hide();
        $('#search-overlay').fadeIn();
        this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
      }
    }
    else{
      $(this).hide();
      $('#search-overlay').fadeIn();
      this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
    }


    setInterval(()=>{
      if(localStorage.getItem("bit")){
        if(localStorage.getItem("bit") == "1"){
          $('#search-overlay').fadeOut();
          $('#search-btn').show();
        }
        else{
          $(this).hide();
          $('#search-overlay').fadeIn();
        }
      }
      else{
        $(this).hide();
        $('#search-overlay').fadeIn();
      }
    },5000);







  }

  getEstimatedTime(){
    var someDate = new Date();
    var numberOfDaysToAdd = 3;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();

    var someFormattedDate = dd + '/'+ mm + '/'+ y;
    return someFormattedDate;
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  next(pageNum){

    if(pageNum == 1){
      if(localStorage.getItem("bit")){
        if(localStorage.getItem("bit") == "1"){

          if(this.websiteUrl.length == 0){
            this.toastr.error("ICO Website URL is Required!.", 'Error!');
          }
          else if(this.about.length == 0){
            this.toastr.error("ICO About is Required!.", 'Error!');
          }
          else if(this.facebook.length == 0){
            this.toastr.error("ICO Facebook Link is Required!.", 'Error!');
          }
          else if(this.twitter.length == 0){
            this.toastr.error("ICO Twitter Link is Required!.", 'Error!');
          }
          else if(this.medium.length == 0){
            this.toastr.error("ICO Medium Link is Required!.", 'Error!');
          }
          else if(this.github.length == 0){
            this.toastr.error("ICO Github Link is Required!.", 'Error!');
          }
          else if(this.reddit.length == 0){
            this.toastr.error("ICO Reddit Link is Required!.", 'Error!');
          }
          else if(this.paperPlane.length == 0){
            this.toastr.error("ICO Paper Plane Link is Required!.", 'Error!');
          }
          else if(this.country.length == 0){
            this.toastr.error("ICO Country Name is Required!.", 'Error!');
          }
          else if(this.startDate.length == 0){
            this.toastr.error("ICO Start Date is Required!.", 'Error!');
          }
          else if(this.endDate.length == 0){
            this.toastr.error("ICO End Date is Required!.", 'Error!');
          }
          else if(this.whitepaper.length == 0){
            this.toastr.error("ICO Whitepaper is Required!.", 'Error!');
          }
          else if(this.watchlist.length == 0){
            this.toastr.error("ICO Watchlist is Required!.", 'Error!');
          }
          else{

            var startDate1 = new Date(this.startDate);
            var tempMonthStorage = parseInt(startDate1.getMonth().toString())+1;
            this.startDate = startDate1.getFullYear() + "-" + tempMonthStorage + "-" + startDate1.getDate() + " " + startDate1.getHours() + ":" + startDate1.getMinutes() + ":" + startDate1.getSeconds();
            var endDate1 = new Date(this.endDate);
            tempMonthStorage = parseInt(endDate1.getMonth().toString())+1;
            this.endDate = endDate1.getFullYear() + "-" + tempMonthStorage + "-" + endDate1.getDate() + " " + endDate1.getHours() + ":" + endDate1.getMinutes() + ":" + endDate1.getSeconds();
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
        }
        else{
          this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
        }
      }
      else{
        this.toastr.error("You need to be loged in; in order to publish an ICO.", 'Error!');
      }
    }else if(pageNum == 2){

      if(this.bounty.length == 0){
        this.toastr.error("ICO Bounty is Required!.", 'Error!');
      }
      else if(this.token.length == 0){
        this.toastr.error("ICO Token is Required!.", 'Error!');
      }
      else if(this.platform.length == 0){
        this.toastr.error("ICO Platform is Required!.", 'Error!');
      }
      else if(this.whitelist.length == 0){
        this.toastr.error("ICO Whitelist is Required!.", 'Error!');
      }
      else if(this.restriction.length == 0){
        this.toastr.error("ICO Restriction is Required!.", 'Error!');
      }
      else if(this.email.length == 0){
        this.toastr.error("ICO Email is Required!.", 'Error!');
      }
      else if(this.description.length == 0){
        this.toastr.error("ICO Description is Required!.", 'Error!');
      }
      else{
        $('#profileLink').removeClass("active");
        $('#homeLink').removeClass("active");
        $('#messagesLink').removeClass("active");

        $('#profile').removeClass("active");
        $('#home').removeClass("active");
        $('#messages').removeClass("active");

        $('#messagesLink').addClass( "active" );
        $('#messages').addClass( "active" );
        $('#progress-bar').css("width","99.99%");
      }
    }else if(pageNum == 3){

      this.isSaving = true;

      //console.log(this.icoData);
      if(!(this.art || this.ai || this.banking || this.bigdata || this.buissnessServices || this.casino || this.manufacturing || this.media || this.sports || this.charity || this.communication || this.cryptocurrency || this.education || this.electronics || this.energy || this.platform_cat || this.realstate || this.tourism || this.entertainment || this.health || this.infrastructure || this.internet || this.investment || this.legal || this.smartContract || this.software || this.virtualReality)){
        this.toastr.error("Atleast one category must be selected!", 'Error!');
        this.isSaving = false;
      }
      else if(this.file == '' || this.file == undefined){
        this.toastr.error("No image selected!", 'Error!');
        this.isSaving = false;
      }
      else if(this.icoName.length == 0){
        this.toastr.error("ICO Name is Required!.", 'Error!');
        this.isSaving = false;
      }

      else{
        firebase.storage().ref().child('ico-images/'+this.makeid()+'.png').put(this.file).then(snapshot => {
          this.imageUrl = snapshot.downloadURL;

          firebase.database().ref('/ICO/All ICO/allico').orderByChild("count").limitToLast(1).once("child_added", (snapshot2)=> {
            this.count = snapshot2.val().count;

            this.icoData = {
              approved: "0",
              name: this.icoName,
              website_link: this.websiteUrl,
              about: this.about,
              // socialMediaLinks: this.socialMediaLinks,
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

              faccebook_url: this.facebook,
              github_url: this.github,
              medium_url: this.medium,
              paperplane_url: this.paperPlane,
              reddit_url: this.reddit,
              twitter_url: this.twitter,


              count: this.count+1
            };
            firebase.database().ref('/ICO/All ICO/allico').push(this.icoData).then(data=>{

              this.toastr.success("ICO Published!", 'Success!');
           //   console.log(this.icoData);
              setTimeout(()=>{
                this.isSaving = false;
                this.router.navigate(["ico"])},1500);
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


  validations(){


    // art: boolean = false;
    // ai: boolean = false;
    // banking: boolean = false;
    // bigdata: boolean = false;
    // buissnessServices: boolean = false;
    // casino: boolean = false;
    // manufacturing: boolean = false;
    // media: boolean = false;
    // sports: boolean = false;
    // charity: boolean = false;
    // communication: boolean = false;
    // cryptocurrency: boolean = false;
    // education: boolean = false;
    // electronics: boolean = false;
    // energy: boolean = false;
    // platform_cat: boolean = false;
    // realstate: boolean = false;
    // tourism: boolean = false;
    // entertainment: boolean = false;
    // health: boolean = false;
    // infrastructure: boolean = false;
    // internet: boolean = false;
    // investment: boolean = false;
    // legal: boolean = false;
    // smartContract: boolean = false;
    // software: boolean = false;
    // virtualReality: boolean = false;







  }

}
