import { Component, OnInit } from '@angular/core';
import { VenuesService } from '../Services/venues.service';
import { Venue } from '../venue';

@Component({
  selector: 'app-venue-info',
  templateUrl: './venue-info.component.html',
  styleUrls: ['./venue-info.component.css']
})
export class VenueInfoComponent implements OnInit {

  mp : Map<string,string>[] = [];

  venues : Venue[] = [];

  constructor(private venuesService : VenuesService) { }

  ngOnInit(): void {
    this.getVenues();
  }

  getVenues(){
    this.venuesService.getVenues().subscribe(
      (x) => {
        x.forEach((y : any) => {
          this.venues.push(new Venue(Number(y['venue_id']),y['venue_name']));
        })
      }
    )
  }

}
