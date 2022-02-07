import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Venue } from '../venue';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly URL ;

  mp : Map<string,string>[] = [];

  constructor(private http : HttpClient) { 
    this.URL = 'http://localhost:3000';
  }
  get(uri : string) : Observable<Map<string,string>[]>{
    // this.http.get<Map<string,string>[]>(`${this.URL}/${uri}`).subscribe(
    //   y => y.forEach(
    //     z => this.mp.push(z)
    //   )
    // ); 
    // console.log('MP',this.mp);
    // // console.log(x.forEach(y => console.log(y)));
    // return of(this.mp);
    return this.http.get<Map<string,string>[]>(`${this.URL}/${uri}`);
  }

  post(uri : string,data : any){
    return this.http.post(`${this.URL}/${uri}`,data);
  }

  // getVenues(uri : string) : Observable<Venue[{
  //   this.http.get<Venue[]>(`${this.URL}/${uri}`).pipe(
  //     map(x : Venue[]) => 
  //   )
  // }
}
