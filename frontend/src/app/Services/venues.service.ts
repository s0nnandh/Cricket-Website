import { Injectable } from '@angular/core';
import { Venue } from '../venue';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  venue : Venue = {
    venue_id : 1,
    venue_name : 'Mumbai'
  }

  venues : Venue[] = [];

  constructor() { }

  getVenues() : Observable<Venue[]>{
    this.venues.push(this.venue);
    return of(this.venues);
  }
}
