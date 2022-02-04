import { Component, OnInit } from '@angular/core';
import { VenuesService } from '../Services/venues.service';
import { Venue } from '../venue';

@Component({
  selector: 'app-venue-info',
  templateUrl: './venue-info.component.html',
  styleUrls: ['./venue-info.component.css']
})
export class VenueInfoComponent implements OnInit {

  venues : Venue[] = [];

  constructor(private venuesService : VenuesService) { }

  ngOnInit(): void {
    this.venuesService.getVenues().subscribe(
      x => this.venues = x
    );
  }

}
