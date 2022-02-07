import { Injectable } from '@angular/core';
import { Match } from '../match';
import { Observable, of } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  x : number = 0;

  

  z : Map<string,string>[] = [];

  constructor(private webReqService : WebRequestService) { }

  getMatches(a : number,b : number) : Observable<Match[]> {
  //  this.webReqService.get(`matches/${a}/${b}`).subscribe(
  //   y => {
  //     this.z = y;
  //     ++this.x;
  //   }
  //  );
  // //  this.z[0].forEach(y => {
  // //   this.matches.push(new Match(y));
  // //   this.x++;
  // //  });
  // console.log(this.z.values());
  // console.log('Z[0',this.z[0]);
  //  console.log('MATCH',this.z);
  //  console.log('X',this.x);
  //  return of(this.matches);
    var matches : Match[] = [];
    this.webReqService.get(`matches/${a}/${b}`).subscribe(      
      (y : any) => y.forEach((z : any) =>  {
        matches.push(new Match(z['match_id'],z['team1'],z['team2'],z['venue_name'],z['city_name'],z['winner']));
      }
    ));
    console.log(matches);
    return of(matches);
  }
}
