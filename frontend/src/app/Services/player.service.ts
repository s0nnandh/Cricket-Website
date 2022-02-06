import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  mp = new Map<string,string>();

  bat = new Map<string,string>();

  g : Array<Map<string,string>> = [];

  constructor(private webReqService : WebRequestService) { }

  getPlayer(id : number){
    this.webReqService.get(`player_info/${id}`).subscribe(
      (x : any) => {
        // console.log(x);
        // console.log(x[0]['player_name']);
        this.mp.set('player',x[0]['player_name']);
        this.mp.set('country',x[0]['country_name']);
        this.mp.set('bat',x[0]['batting_hand']);
        this.mp.set('bowl',x[0]['bowling_skill']);
      }
    )
    return of(this.mp);
  }

  getStat(id : number){
    this.webReqService.get(`player_info2/${id}`).subscribe(
      (x : any) => {
        this.bat.set('matches',x[0]['matches']);
        this.bat.set('runs',x[0]['runs']);
        this.bat.set('four',x[0]['fours']);
        this.bat.set('six',x[0]['sixes']);
        this.bat.set('fifty',x[0]['fifties']);
        this.bat.set('hs',x[0]['hs']);
        this.bat.set('sr',x[0]['strike_rate']);
        this.bat.set('avg',x[0]['average']);
      }
    )
    return of(this.bat);
  }

  getRuns(id : number){
    this.g = [];
    return this.webReqService.get(`player_info3/${id}`);
    // this.webReqService.get(`player_info3/${id}`).subscribe(
    //   (x : any) => {
    //     x.forEach(
    //       (y : any) => {
    //         var t = new Map<string,string>();
    //         t.set('id',y['match_id']);
    //         t.set('runs',y['runs']);
    //         console.log(t);
    //         this.g.push(t);
    //       }
    //     )
    //   }
    // )
    // console.log(this.g);
    // return this.g;
  }

  getBowl(id : number){
    return this.webReqService.get(`bowler_info/${id}`);
  }

  getGraph(id : number){
    return this.webReqService.get(`bowler_info2/${id}`);
  }

}
