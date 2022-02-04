import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly URL ;

  constructor(private http : HttpClient) { 
    this.URL = '';
  }
  get(uri : string){
    return this.http.get(`${this.URL}/${uri}`);
  }
}
