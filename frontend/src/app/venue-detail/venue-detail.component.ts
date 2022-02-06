import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VenueService } from '../Services/venue.service';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {

  mp = new Map<string,string>();

  id : number = 0;

  Ids : Array<string> = ['2011','2013','2015'];

  public lineChartOptions : ChartConfiguration['options'] = {
    responsive : true
  };

  public lineChartType : ChartType = 'line';

  public lineChartData : ChartData<'line'> = {
    labels : [],
    datasets : [
      {
        data : [0,0,0],
        label : 'A'
      }
    ]

  };

  public doughnutChartLabels: string[] = [ 'First','Second','Draw' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private venueService : VenueService
  ) { }

  ngOnInit(): void {  
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getVenue()
    this.getAvg();
    this.getToss();
  }

  getVenue(){
    
    this.venueService.getVenue(this.id).subscribe(
      x => {
        x.forEach((y : any) => {
          this.mp.set('venue_id',y['venue_id']);
          this.mp.set('venue_name',y['venue_name']);
          this.mp.set('city',y['city_name']);
          this.mp.set('country',y['country_name']);
          this.mp.set('cap',y['capacity']);
          this.mp.set('HighestTotal',y['max']);
          this.mp.set('chase',y['max_chase']);
          this.mp.set('Lowest',y['min']);
        })
      }
    )
  }

  getValues(){
    var x = [];
    for(let y of this.mp){
      x.push(y[1]);
    }
    return x;
  }

  getToss(){
    this.venueService.getPie(this.id).subscribe(
      (x : any) => {
        x.forEach((y : any) => {
          this.doughnutChartData.datasets[0].data.push(Number(y['first_batting']));
          this.doughnutChartData.datasets[0].data.push(Number(y['second_batting']));
          this.doughnutChartData.datasets[0].data.push(Number(y['total']) - Number(y['first_batting']) - Number(y['second_batting']));
        })
      }
    )
  }

  getAvg(){
    this.venueService.getGraph(this.id).subscribe(
      x => {
        x.forEach((y : any) => {
          var year = Number(y['season_year']);
          this.lineChartData.datasets[0].data[(year - 2011) / 2] = Number(y['avg']);
        })
      }
    );
    console.log(this.Ids);
    console.log(this.lineChartData.datasets[0].data);
  }

}
