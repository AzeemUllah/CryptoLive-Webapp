import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {ActivatedRoute} from "@angular/router";
import * as firebase from "firebase";
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-ico-details-video-section',
  templateUrl: './ico-details-video-section.component.html',
  styleUrls: ['./ico-details-video-section.component.css']
})
export class IcoDetailsVideoSectionComponent implements OnInit {

  id: string = '';
  icoDetails: any = {
    video_url: '',
    token: '',
    price: '',
    bounty: '',
    platform: '',
    accepting: '',
    softcap: '',
    goal: '',
    country: '',
    whitelist: '',
    restricted_area: ''
  };


  constructor(private db: AngularFireDatabase, public router: ActivatedRoute,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params.id;
      this.getIcoDetails();
      window.scrollTo(0, 0);
    });
  }

  getIcoDetails(){
    var coinRef = firebase.database().ref('/ICO/All ICO/allico/'+this.id);
    coinRef.on('value', snapshot => {
      this.icoDetails = snapshot.val();
      this.loadIframe("videoFrame",this.icoDetails.video_url);
    });
  }

  loadIframe(iframeName, url) {
  var $iframe = $('#' + iframeName);
  if ( $iframe.length ) {
    $iframe.attr('src',url);
    return false;
  }
  return true;
  }

}
