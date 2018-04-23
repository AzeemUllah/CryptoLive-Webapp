import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {ActivatedRoute} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-ico-details-social',
  templateUrl: './ico-details-social.component.html',
  styleUrls: ['./ico-details-social.component.css']
})
export class IcoDetailsSocialComponent implements OnInit {
  id: string = '';
  icoDetails: any = {

    "faccebook_url": '',
    "twitter_url": '',
    "github_url": '',
    "reddit_url": '',
    "medium_url": '',
    "paperplane_url": ''
  };
  constructor(private db: AngularFireDatabase,  public router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.id = params.id;
      this.getIcoDetails();
      });
  }

  getIcoDetails(){
    var coinRef = firebase.database().ref('/ICO/All ICO/allico/'+this.id);
    coinRef.on('value', snapshot => {
      this.icoDetails = snapshot.val();
    });
  }


}
