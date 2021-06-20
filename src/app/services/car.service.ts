import { config } from './../constants/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleRes } from '../models/vehicle.res.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  postVehicle(formData:FormData){
    return this.http.post(`${config.apiUrl}vehicle`,formData, {
      observe: "response",     
    },);
  }

  getAllVehicles(){
    return this.http.get<VehicleRes>(`${config.apiUrl}vehicle`, {
      observe: "response",     
    });
  }
}
