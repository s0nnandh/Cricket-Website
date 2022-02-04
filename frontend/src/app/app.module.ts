import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchInfoComponentComponent } from './match-info-component/match-info-component.component';
import { HttpClientModule } from '@angular/common/http';
import { VenueInfoComponent } from './venue-info/venue-info.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { PointsTableComponent } from './points-table/points-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchInfoComponentComponent,
    VenueInfoComponent,
    VenueDetailComponent,
    PlayerDetailComponent,
    MatchDetailComponent,
    PointsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
