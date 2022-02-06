import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlayerService } from '../Services/player.service';
import Chart, { ChartConfiguration, ChartData, ChartType, Color } from 'chart.js/auto';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})

export class PlayerDetailComponent implements OnInit {

  

  mp = new Map<string,string>();

  bat : Map<string,string> = new Map<string,string>();

  id : number = 0;

  Ids : Array<string> = [];

  runs : Array<number> = [];

  b1 : Map<string,string> = new Map<string,string>();

  ball_Ids : Array<string> = [];
  ball_runs : Array<number> = [];
  ball_w : Array<number> = [];

  public opt =  {
    "options": {
      "legend": {
        "text": "You awesome chart with average line",
        "display": true,
      },
      "scales": {
        "yAxes": [{
          "ticks": {
          "beginAtZero": true
          }
        }],
        "xAxes": [{
          "ticks": {
          "min": "Monday",
          "max": "Sunday",
          }
        }],
      }
    }
  };

  public chart : ChartData<'bar' | 'line'> = {
    "datasets" : [
      { data : [],"label" : 'A',type : 'line'},
      { data : [],"label" : 'B'}
    ],
    // "options": {
    //   "legend": {
    //     "text": "You awesome chart with average line",
    //     "display": true,
    //   },
    //   "scales": {
    //     "yAxes": [{
    //       "ticks": {
    //       "beginAtZero": true
    //       }
    //     }],
    //     "xAxes": [{
    //       "ticks": {
    //       "min": "Monday",
    //       "max": "Sunday",
    //       }
    //     }],
    //   }
    // }
  };

  public barChartOptions : ChartConfiguration['options'] = {
    responsive : true
  };

  public barChartData : ChartData<'bar',number[]> = {
    labels : [],
    datasets : [
      { data : [],label : 'A',backgroundColor : []},

    ]
  };

  public lineChartType : ChartType = 'line';

  public lineChartData : ChartData<'line',number[]> = {
    labels : [],
    datasets : [
      { data : [],label : 'B'},
      { data : [],label : 'C',type : 'line'}
    ]
  };

  public lineChartOptions : ChartConfiguration['options'] = {
    responsive : true
  };

  // public barChartColors: any[] = [
  //   { backgroundColor: 'rgba(148,159,177,0.2)' },
  //   { backgroundColor: 'green' },
  // ];

  // public colors : any[] = [];

  public barChartType : ChartType = 'bar';

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private playerService : PlayerService
  ) { }

  ngOnInit(): void {
    this.Ids = [];
    this.runs = [];
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getPlayer(this.id).subscribe(
      x => this.mp = x
    );
    this.playerService.getStat(this.id).subscribe(
      x => this.bat = x
    );
    this.getGraph();
    this.getBowl();
  }

  public cls : any[] = []

  // getValues(){
  //   return Array.of(this.mp.values());
  // }

  getBatValues() : Array<Array<string>>{
    let batArray : Array<Array<string>> = [];
    this.bat.forEach((value,key) => {
      let ar : Array<string> = [];
      ar.push(key);
      ar.push(value);
      batArray.push(ar);
    });

    return batArray;
  }

  getGraph(){
    this.playerService.getRuns(this.id).subscribe(
      x => {
        // console.log(x);
        x.forEach((y : any) => {
          this.Ids.push(y['match_id']);
          this.barChartData?.datasets[0].data.push(y['runs']);
          if(y['runs'] < 30){
            this.cls.push('rgba(148,159,177,0.2)');
          } 
          else if(y['runs'] >= 30 && y['runs'] <= 50){
            this.cls.push('rgba(148,159,177,0.8)');
          }
          else{
            this.cls.push('rgba(255,0,0,0.3)');
          }
        })
      }
    );
    this.barChartData.datasets[0].backgroundColor = this.cls;
    this.playerService.getGraph(this.id).subscribe(
      x => {
        x.forEach((y : any) => {
          this.ball_Ids.push(y['match_id']);
          this.chart.datasets[1].data.push(Number(y['runs']));
          var k = Number(y['wickets']);
          this.chart.datasets[0].data.push(k);
        })
      }
    )
    console.log(this.ball_Ids);
    console.log(this.ball_runs);
    console.log(this.ball_w);
    // this.construct();    
  }
  construct(){
    // let chart = new Chart("ctx",{
    //   type : 'line',
    //   data : {
    //     labels : this.Ids,
    //     datasets : [
    //       {
    //         label : 'Data',
    //         data : this.runs
    //       }
    //     ]
    //   },
    //   options : {}
    // });   
    // console.log(chart);
  }

  getBowl(){
    this.playerService.getBowl(this.id).subscribe(
      (x : any) => {
        x.forEach((y : any) => {
          this.b1.set('player_name',y['player_name']);
          this.b1.set('id',y['bowler']);
          this.b1.set('runs',y['runs']);
          this.b1.set('balls',y['balls']);
          this.b1.set('wickets',y['wickets']);
          this.b1.set('fv',y['five_wickets']);
        })
      }
    )
    console.log(this.b1);
  }


}
