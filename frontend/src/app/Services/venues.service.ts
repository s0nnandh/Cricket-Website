import { Injectable } from '@angular/core';
import { Venue } from '../venue';
import { Observable, of } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  venue : Venue = {
    venue_id : 1,
    venue_name : 'Mumbai'
  }

  venues : Venue[] = [];

  constructor(private webReqService : WebRequestService) { }

  getVenues(){
    return this.webReqService.get(`venue`);
  }
}
