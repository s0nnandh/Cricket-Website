import { Component, OnInit } from '@angular/core';
import { Match } from '../match';
import { MatchesService } from '../Services/matches.service';

@Component({
  selector: 'app-match-info-component',
  templateUrl: './match-info-component.component.html',
  styleUrls: ['./match-info-component.component.css']
})
export class MatchInfoComponentComponent implements OnInit {

  cnt : number = 0

  matches : Match[] = [];

  constructor(private matchService : MatchesService) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(){
    this.matchService.getMatches().subscribe(
      x => this.matches = x
    );
  }

}
