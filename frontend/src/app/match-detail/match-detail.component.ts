import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatchesService } from '../Services/matches.service';
import { MatchService } from '../Services/match.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Chart,registerables } from 'chart.js';
import { Observable } from 'rxjs';
// import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  mp : Array<Map<string,string>>[] = [];

  b : Array<Map<string,string>>[]  = [];

  g : Array<number>[] = [];

  pie : Array<number> = [];

  batSum : Array<Map<string,string>>[] = [];

  bowlSum : Array<Map<string,string>>[] = [];

  id : number = 0;


  extra : Array<number>= [];

  totals : Array<number> = [];

  wickets : Array<number> = [];

  public pieChartType: ChartType = 'pie';

  public pieChartOptions : ChartConfiguration['options'];

  public pieChartData? : ChartData<'pie',number[],string>;

  public pieChartLegend = true;

  public lineChartType : ChartType = 'line';

  public lineChartOptions : ChartConfiguration['options'];

  public lineChartData? : ChartData<'line' | 'bubble'>;

  

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private matchService : MatchService
  ) { }

  ngOnInit(): void {  
    Chart.register(...registerables);  
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
  }

  getData(){
    this.mp = [];
    this.b = [];
    this.g = [];
    this.pie = [];
    this.batSum = [];
    this.bowlSum = [];
    this.totals = [];
    this.wickets = [];
    this.extra = [];
    this.getPie();
    for(let i = 0;i < 2;++i){
      this.getBatInn(i + 1);
      this.getBowlInn(i + 1);
      this.getGraphInn(i + 1);
      this.getExtra(i + 1);
    }
    this.construct();
  }

  getExtra(inn : number){
    this.matchService.getExtra(this.id,inn).subscribe(
      (x)=> {
        x.forEach((y : any) => {
          this.extra.push(Number(y['extra_runs']));
          this.wickets.push(Number(y['wickets']));
          this.totals.push(Number(y['total']));
        })
      }
    )
  }

  construct(){
    this.pieChartOptions = {
      responsive : true,
      plugins : {
        legend : {
          display : true,
          position : 'top'
        }
      },   
    };
    this.lineChartOptions = {
      responsive : true,
      plugins : {
        legend : {
          display : true,
          position : 'top'
        }
      },  
    };
    this.lineChartData = {
      labels : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      datasets : [
        {
          data : this.g[0],
          label : 'Innings 1',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        },
        {
          data : this.g[1],
          label : 'Innings 2',
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
        },
        {
          data : [],
          label : 'Wickets 1',
          backgroundColor : 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          hoverBackgroundColor: '#fff',
          hoverBorderColor: 'rgba(148,159,177,0.8)',
          type : 'bubble'
        },
        {
          data : [],
          label : 'Wickets 2',
          backgroundColor : 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          hoverBackgroundColor: '#fff',
          hoverBorderColor: 'rgba(148,159,177,0.8)',
          type : 'bubble'
        }
        
      ]
    }
    this.pieChartData = {
      labels : ['ones','twos','threes','fours','sixes','extras'],
      datasets : [
        {
          data : this.pie
        }
      ]
    };
    // this.pieChartData?.labels = ['ones','twos','threes','fours','sixes','extras'];
  }

  getBatInn(inn : number){
    console.log('ID',inn);
    this.matchService.getMatch(this.id,inn).subscribe(
      (x : any) => {
        var K : Array<Map<string,string>> = [];
        x.forEach((y : any) =>  {
          var z = new Map<string,string>();
          z.set('striker',y['striker']);
          z.set('player_name',y['player_name']);
          z.set('runs',y['runs']);
          z.set('fours',y['fours']);
          z.set('sixes',y['sixes']);
          z.set('balls_faced',y['balls_faced']);
          K.push(z);
          // this.mp.push(new Map<string,string>(y));
        });
        this.mp.push(K);
      }
    );
    this.matchService.getBatSum(this.id,inn).subscribe(
      (x : any) => {
        var K : Array<Map<string,string>> = [];
        x.forEach((y : any) => {
          var t = new Map<string,string>();
          t.set('id',y['player_id']);
          t.set('name',y['player_name']);
          t.set('runs',y['runs']);
          t.set('balls',y['balls_faced']);
          K.push(t);
        })
        this.batSum.push(K); 
      }
    )
    // console.log(this.batSum);
  }

  getBowlInn(inn : number){
    this.matchService.getBowl(this.id,inn).subscribe(
      (x : any) => {
        var K : Array<Map<string,string>> = [];
        x.forEach((y : any) =>  {
          var z = new Map<string,string>();
          z.set('bowler',y['bowler']);
          z.set('player_name',y['player_name']);
          z.set('runs_given',y['runs_given']);
          z.set('wickets',y['wickets']);
          z.set('balls_bowled',y['balls_bowled']);
          K.push(z);
          // this.mp.push(new Map<string,string>(y));
        });
        this.b.push(K);
      }
    );
    this.matchService.getBallSum(this.id,inn).subscribe(
      (x : any) => {
        var K : Array<Map<string,string>> = [];
        x.forEach((y : any) => {
          var t = new Map<string,string>();
          t.set('id',y['bowler']);
          t.set('name',y['player_name']);
          t.set('runs',y['runs_given']);
          t.set('balls',y['balls_bowled']);
          t.set('wickets',y['wickets']);
          K.push(t);
        })
        this.bowlSum.push(K); 
      }
    )
    // console.log(this.bowlSum);
  } 

  getGraphInn(inn : number){
    this.matchService.getGraph(this.id,inn).subscribe(
      (x : any) => {
        // console.log(x);
        var arr = new Array<number>();
        var val = 0;
        this.lineChartData?.datasets[inn - 1].data.push(0);
        var prev_over = 1;
        var w = 0;
        x.forEach((y : any) => {
          // console.log(y);
          if(y['out_type'] == null){
            val += Number(y['runs_scored']) + Number(y['extra_runs']);
            // console.log(Number(y['runs_scored']));
          }
          else{
            w++;
          }
          if(prev_over != y['over_id']){            
            this.lineChartData?.datasets[inn - 1].data.push(val);
            for(let i = 0;i < w;++i){
              this.lineChartData?.datasets[inn + 1].data.push({
                x : prev_over,
                y : val,
                r : 5
              })
            }
            w = 0;
            prev_over = y['over_id'];
          }
        });
        this.lineChartData?.datasets[inn - 1].data.push(val);
        // this.lineChartData?.datasets[0].data.(arr);
    }
    );
    // console.log(this.g);
  }

  getPie(){
    this.matchService.getPie(this.id).subscribe(
      (x : any) => {
        // console.log(JSON.stringify(x[0]));
        this.pieChartData?.datasets[0].data.push(Number(x[0]['ones']));
        this.pieChartData?.datasets[0].data.push(Number(x[0]['twos']));
        this.pieChartData?.datasets[0].data.push(Number(x[0]['threes']));
        this.pieChartData?.datasets[0].data.push(Number(x[0]['fours']));
        this.pieChartData?.datasets[0].data.push(Number(x[0]['sixes']));
        this.pieChartData?.datasets[0].data.push(Number(x[0]['extras']));
      }
    );
    
    // console.log(this.pie);
  }



}
