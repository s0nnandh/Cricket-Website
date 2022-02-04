import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  mp = new Map<string,string>();

  constructor() { }

  getPlayer(id : number){
    this.mp.set('name','Rajesh');
    this.mp.set('Country','India');
    this.mp.set('bat','a');
    this.mp.set('bowl','b');
    return of(this.mp);
  }

}
