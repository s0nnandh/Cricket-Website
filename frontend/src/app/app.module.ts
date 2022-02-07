import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchInfoComponentComponent } from './match-info-component/match-info-component.component';
import { HttpClientModule } from '@angular/common/http';
import { VenueInfoComponent } from './venue-info/venue-info.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { PointsTableComponent } from './points-table/points-table.component';
import { VenueFormComponent } from './venue-form/venue-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchInfoComponentComponent,
    VenueInfoComponent,
    VenueDetailComponent,
    PlayerDetailComponent,
    MatchDetailComponent,
    PointsTableComponent,
    VenueFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
