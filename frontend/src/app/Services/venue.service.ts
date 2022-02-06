import { Injectable } from '@angular/core';
import { map, Observable, of, retry } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private webReqService : WebRequestService) { }

  getVenue(id : number) {
    return this.webReqService.get(`venue_details/${id}`);
  }

  getGraph(id : number){
    return this.webReqService.get(`venue_graph/${id}`);
  }

  getPie(id : number){
    return this.webReqService.get(`venue_pie/${id}`);
  }

}
