import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  mp : Map<string,string>[] = []; 

  constructor(private webReqService : WebRequestService) { }

  getMatch(id : number,inn : number){
    console.log(`match_id/batsmen/${id}/${inn}`);
    return this.webReqService.get(`match_id/batsmen/${id}/${inn}`);
    // console.log(this.mp);
    // return of(this.mp);
  }

  getBowl(id : number,inn : number){
    return this.webReqService.get(`match_id/bowler/${id}/${inn}`);
  }

  getGraph(id : number,inn : number){
    return this.webReqService.get(`match_graph/${id}/${inn}`);
  }

  getPie(id : number){
    return this.webReqService.get(`match_pie/${id}`);
  }

  getBatSum(id : number,inn : number){
    return this.webReqService.get(`match_summary/batsmen/${id}/${inn}`);
  }

  getBallSum(id : number,inn : number){
    return this.webReqService.get(`match_summary/bowler/${id}/${inn}`);
  }

}
