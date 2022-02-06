import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../match';
import { MatchesService } from '../Services/matches.service';

@Component({
  selector: 'app-match-info-component',
  templateUrl: './match-info-component.component.html',
  styleUrls: ['./match-info-component.component.css']
})
export class MatchInfoComponentComponent implements OnInit {

  @Input() cnt : number = 0

  @Input() stop : number = 1

  matches : Match[] = [];

  constructor(private matchService : MatchesService) { }

  ngOnInit(): void {
    this.getMatches(1,10).then(res => this.f2());
  }

  getMatches(a : number,b : number){
    return new Promise<void>((resolve) => {
        this.matches = [];
        this.matchService.getMatches(a,b).subscribe(
        x => {
          this.matches = x;
        }
      );
      resolve();
    });
    
  }

  f2(){
    console.log(this.matches.length);
    if(this.matches.length < 10){
      this.stop = 0;
    }
    else this.stop = 1;
  }

  onNext(){
    this.cnt++;
    var x = 10 * this.cnt + 1;
    this.getMatches(x,x + 9);
  }

  

  goBack(){
    this.cnt--;
    if(this.cnt < 0)this.cnt = 0;
    var x = 10 * this.cnt + 1;
    this.getMatches(x,x + 9);
  } 


}

