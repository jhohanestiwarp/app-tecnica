import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

import Flygth from "../models/Fligth";


@Injectable({
  providedIn: 'root'
})
export class DataService {
private Api = "https://recruiting-api.newshore.es/api/flights/2"
  constructor(private http:HttpClient) { }

  getfly():Observable<Flygth[]>{
    return this.http.get<Flygth[]>(this.Api)
    

  }



//peticion por promesa

  // getfly(){
  //   return this.http.get("https://recruiting-api.newshore.es/api/flights/2").toPromise();
  // }

}
