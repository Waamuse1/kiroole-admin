import { Building, BuildingOffice } from './../../../models/building_office.res.model';
import { BuildingService } from './../../../services/building.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent implements OnInit {
  buildingId;
  offices:BuildingOffice[];
  building:Building;

  constructor(private route:ActivatedRoute,
     private ngxService: NgxUiLoaderService,private toast: ToastrService,private buildingService:BuildingService) { }

  ngOnInit(): void {
    this.buildingId =String(this.route.snapshot.paramMap.get('id')); 
    console.log(this.buildingId,"building details");
    this.getBuildingOffices(this.buildingId);
    this.getBuildingDetails(this.buildingId);
  }
  getBuildingOffices(buildingId:string){
    this.ngxService.start();
    this.buildingService.getBuildingOffices(buildingId).subscribe(res => {
      this.ngxService.stop();
      if(res.status == 200){
        this.offices = res.body.data;

      }
    },error => {
      this.ngxService.stop();
      console.log(error);
      this.toast.error("Unable to get offices, Try again later", "Error!")
    })
    
  }
  getBuildingDetails(buildingId){
    this.buildingService.getSingleBuilding(buildingId).subscribe(res=> {
      this.building = res.body.data;
    }, error => {
      console.log('unable to get building details');
    })

  }


}
