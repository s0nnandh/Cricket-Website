import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location  } from '@angular/common';
import { PointsService } from '../Services/points.service';

@Component({
  selector: 'app-points-table',
  templateUrl: './points-table.component.html',
  styleUrls: ['./points-table.component.css']
})
export class PointsTableComponent implements OnInit {

  mp : Array<Map<string,string>> = []; 

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private pointService : PointsService
  ) { }

  ngOnInit(): void {
    this.mp = [];
    this.getTable();
  }

  getTable(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pointService.getTable(id).subscribe(
      (x : any) => {
        x.forEach((y : any) => {
          var t = new Map<string,string>();
          t.set('matches',y['nmatch']);
          t.set('wins',y['wins']);
          t.set('lose',y['lose']);
          t.set('season_year',y['season_year']);
          t.set('id',y['team_id']);
          t.set('name',y['team_name']);
          t.set('nrr',y['nrr']);
          t.set('points',y['points']);
          this.mp.push(t);
        })
      }
    )

  }

}
