import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VenueService } from '../Services/venue.service';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {

  mp = new Map<string,string>();

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private venueService : VenueService
  ) { }

  ngOnInit(): void {  
    this.getVenue()
  }

  getVenue(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.venueService.getVenue(id).subscribe(
      x => this.mp = x
    )
  }

  getValues(){
    return Array.from(this.mp.values());
  }

}
