import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FindFareComponent } from './find-fare/find-fare.component';
import { FindFareDynamicComponent } from './find-fare-dynamic/find-fare-dynamic.component';

import { TripService } from '../app/services/trip/trip.service';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PageNotFoundComponent,
    FindFareComponent,
    FindFareDynamicComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'dynamic-fare', component: FindFareDynamicComponent},
      { path: '**', component: PageNotFoundComponent },
    ])
  ],
  providers: [TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
