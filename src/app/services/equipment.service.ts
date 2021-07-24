import { SingleEquipmentRes } from './../models/single_equipment.res';
import { HttpClient } from '@angular/common/http';
import { config } from './../constants/global';
import { Injectable } from '@angular/core';
import { EquipmentRes } from '../models/equipment_res.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }
  postEquipment(formData:FormData){
    return this.http.post(`${config.apiUrl}equipment`,formData, {
      observe: "response",     
    },);
  }

  getAllEquipments(){
    return this.http.get<EquipmentRes>(`${config.apiUrl}equipment`, {
      observe: "response",     
    });
  }
  getSingleEquipments(id:string){
    return this.http.get<SingleEquipmentRes>(`${config.apiUrl}equipment/${id}`, {
      observe: "response",     
    });
  }
}
