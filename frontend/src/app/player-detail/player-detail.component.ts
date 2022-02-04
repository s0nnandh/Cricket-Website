import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlayerService } from '../Services/player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  mp = new Map<string,string>();

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private playerService : PlayerService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getPlayer(id).subscribe(
      x => this.mp = x
    )
  }

  getValues(){
    return Array.of(this.mp.values());
  }

}
