import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ico-main-page-planing-ico',
  templateUrl: './ico-main-page-planing-ico.component.html',
  styleUrls: ['./ico-main-page-planing-ico.component.css']
})
export class IcoMainPagePlaningIcoComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  gotoPublish(){
    this.router.navigate(['ico/publish-ico']);
  }

}
