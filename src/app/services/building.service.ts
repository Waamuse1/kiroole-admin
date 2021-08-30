import { SingleBuildingRes } from './../models/single_building.model';
import { BuildingOfficeRes } from './../models/building_office.res.model';
import { config } from './../constants/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuildingRes } from '../models/building_res.model';
import { OfficePayload } from '../payloads/office.payload';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  postBuilding(formData:FormData){
    return this.http.post(`${config.apiUrl}building`,formData, {
      observe: "response",     
    },);
  }

  getAllBuilding(){
    return this.http.get<BuildingRes>(`${config.apiUrl}building`, {
      observe: "response",     
    });
  }
  getSingleBuilding(buildingId:string){
    return this.http.get<SingleBuildingRes>(`${config.apiUrl}building/${buildingId}`, {
      observe: "response",     
    });
  }

  addOffice(unit:OfficePayload){
    return this.http.post(`${config.apiUrl}offices`,unit, {
      observe: "response",     
    },);
  }

  getBuildingOffices(buildingId:string){
    return this.http.get<BuildingOfficeRes>(`${config.apiUrl}offices/${buildingId}`, {
      observe: "response",     
    });
  }
  deleteBuilding(buildingId:string){
    return this.http.delete<any>(`${config.apiUrl}building/${buildingId}`, {
      observe: "response",     
    });
  }
  deleteOffice(officeId:string){
    return this.http.delete<any>(`${config.apiUrl}offices/${officeId}`, {
      observe: "response",     
    });
  }

  
}
