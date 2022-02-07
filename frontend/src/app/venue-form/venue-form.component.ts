import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../Services/web-request.service';

@Component({
  selector: 'app-venue-form',
  templateUrl: './venue-form.component.html',
  styleUrls: ['./venue-form.component.css']
})
export class VenueFormComponent implements OnInit {

  public Name = "";

  public Country = "";

  public City = "";

  public Capacity = "";

  constructor(private webReqService : WebRequestService) { }

  ngOnInit(): void {
  }

  onSubmit(res : any){
    console.log(res);
    this.webReqService.post(`venue_add`,res);
    this.Name = "";
    this.Country="";
    this.Capacity="";
    this.City="";
  }

}
