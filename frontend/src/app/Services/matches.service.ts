import { Injectable } from '@angular/core';
import { Match } from '../match';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  match : Match = {
    match_id : 1,
    Team1 : 'A',
    Team2 : 'B'
  };

  matches : Match[] = [];

  constructor() { }

  getMatches() : Observable<Match[]> {
   this.matches.push(this.match);
   return of(this.matches);
  }
}
