import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorage, AngularFireStorageModule} from 'angularfire2/storage';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopBanerComponent } from './home-page/top-baner/top-baner.component';
import { ImagesSectionComponent } from './home-page/images-section/images-section.component';
import { MiddleCtaComponent } from './home-page/middle-cta/middle-cta.component';
import { GraphTableComponent } from './home-page/graph-table/graph-table.component';
import { BottomCardsComponent } from './home-page/bottom-cards/bottom-cards.component';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {HttpClientModule} from '@angular/common/http';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { CoinHeadingComponent } from './coin-details/coin-heading/coin-heading.component';
import { CoinChartsComponent } from './coin-details/coin-charts/coin-charts.component';
import { CoinTopCardsComponent } from './coin-details/coin-top-cards/coin-top-cards.component';
import { IcoComponent } from './ico/ico.component';
import { MainPageComponent } from './ico/main-page/main-page.component';
import { IcoMainPageTopCardsComponent } from './ico/main-page/ico-main-page-top-cards/ico-main-page-top-cards.component';
import { IcoMainPageTablesComponent } from './ico/main-page/ico-main-page-tables/ico-main-page-tables.component';
import { IcoMainPagePlaningIcoComponent } from './ico/main-page/ico-main-page-planing-ico/ico-main-page-planing-ico.component';
import { IcoMainPageIcoListingComponent } from './ico/main-page/ico-main-page-ico-listing/ico-main-page-ico-listing.component';
import { IcoDetailsComponent } from './ico/ico-details/ico-details.component';
import { IcoDetailsTopHeaderComponent } from './ico/ico-details/ico-details-top-header/ico-details-top-header.component';
import { IcoDetailsSocialComponent } from './ico/ico-details/ico-details-social/ico-details-social.component';
import { IcoDetailsVideoSectionComponent } from './ico/ico-details/ico-details-video-section/ico-details-video-section.component';
import { IcoDetailsVideoSubscribeComponent } from './ico/ico-details/ico-details-video-subscribe/ico-details-video-subscribe.component';
import { IcoDetailsDescriptionComponent } from './ico/ico-details/ico-details-description/ico-details-description.component';
import {ToastModule, ToastOptions} from 'ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PublishIcoComponent } from './ico/publish-ico/publish-ico.component';
import { AboutComponent } from './about/about/about.component';
import {ChartsModule} from "ng2-charts";

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = true;
  showCloseButton = true;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    TopBanerComponent,
    ImagesSectionComponent,
    MiddleCtaComponent,
    GraphTableComponent,
    BottomCardsComponent,
    CoinDetailsComponent,
    CoinHeadingComponent,
    CoinChartsComponent,
    CoinTopCardsComponent,
    IcoComponent,
    MainPageComponent,
    IcoMainPageTopCardsComponent,
    IcoMainPageTablesComponent,
    IcoMainPagePlaningIcoComponent,
    IcoMainPageIcoListingComponent,
    IcoDetailsComponent,
    IcoDetailsTopHeaderComponent,
    IcoDetailsSocialComponent,
    IcoDetailsVideoSectionComponent,
    IcoDetailsVideoSubscribeComponent,
    IcoDetailsDescriptionComponent,
    PublishIcoComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: '', component: HomePageComponent},
        { path: 'coin-details/:symbol', component: CoinDetailsComponent},
        { path: 'ico', component: IcoComponent, children: [
            { path: '', component: MainPageComponent},
            { path: 'ico-details/:id', component: IcoDetailsComponent},
            { path: 'publish-ico', component: PublishIcoComponent}
          ]},
        { path: 'about', component: AboutComponent},
        { path: '*', component: HomePageComponent},
        ]),
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [AngularFireDatabaseModule, AngularFireDatabase, AngularFireStorage, {provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})
export class AppModule { }
