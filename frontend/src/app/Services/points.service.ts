import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private webReqService : WebRequestService) { }

  getTable(id :number){
    return this.webReqService.get(`pointstable/${id}`);
  }
}
