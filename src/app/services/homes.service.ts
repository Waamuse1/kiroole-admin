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
}
