import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchInfoComponentComponent } from './match-info-component/match-info-component.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PointsTableComponent } from './points-table/points-table.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenueFormComponent } from './venue-form/venue-form.component';
import { VenueInfoComponent } from './venue-info/venue-info.component';

const routes: Routes = [
  { path : 'matches', component : MatchInfoComponentComponent },
  { path : 'venues', component : VenueInfoComponent },
  { path : 'venues/add', component : VenueFormComponent,pathMatch : 'full'},
  { path : 'venues/:id',component : VenueDetailComponent },
  { path : 'players/:id',component : PlayerDetailComponent },
  { path : 'matches/:id',component : MatchDetailComponent },
  { path : 'pointstable/:id',component : PointsTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
