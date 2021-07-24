import { Equipment } from './../../models/equipment_res.model';
import { EquipmentService } from './../../services/equipment.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  equipments:Equipment[];
  constructor(private ngxService: NgxUiLoaderService, private equipmentService:EquipmentService) {

  }
  ngOnInit(): void {
    this.getEquipments()
    
  }

  getEquipments(){
    this.ngxService.start(); 
    console.log('getting homes');
    this.equipmentService.getAllEquipments().subscribe(home => {
      this.ngxService.stop();
      this.equipments = home.body.data;
      console.log(home.body.data);
    },error => {
      console.log(error);
      this.ngxService.stop();
    })
  }
  
}
