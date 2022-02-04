import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location  } from '@angular/common';

@Component({
  selector: 'app-points-table',
  templateUrl: './points-table.component.html',
  styleUrls: ['./points-table.component.css']
})
export class PointsTableComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit(): void {
  }

  getTable(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
  }

}
