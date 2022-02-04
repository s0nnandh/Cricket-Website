import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private webReqService : WebRequestService) { }

  getVenue(id : number) : Observable<Map<string,string>>{
    let mp = new Map<string,string>();
    mp.set('VenueName','a');
    mp.set('Address','a');
    mp.set('Capacity','a');
    mp.set('Total','a');
    mp.set('High','a');
    mp.set('Low','a');
    mp.set('Chase','b')
    return of(mp);
  }

}
