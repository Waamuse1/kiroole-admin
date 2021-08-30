import { SingleHomeResponse } from './../models/single_home_res';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../constants/global';
import { HomesResponse } from '../models/homes_res.model';

@Injectable({
  providedIn: 'root'
})
export class HomesService {

  constructor(private http: HttpClient) { }

  postHome(formData:FormData){
    return this.http.post(`${config.apiUrl}homes`,formData, {
      observe: "response",     
    },);
  }

  getAllHomes(){
    return this.http.get<HomesResponse>(`${config.apiUrl}homes`, {
      observe: "response",     
    });
  }

  getSingleHomes(homeId){
    return this.http.get<SingleHomeResponse>(`${config.apiUrl}homes/${homeId}`, {
      observe: "response",     
    });
  }

  deleteHome(homeId){
    return this.http.delete<any>(`${config.apiUrl}homes/${homeId}`, {
      observe: "response",     
    });
  }
}
