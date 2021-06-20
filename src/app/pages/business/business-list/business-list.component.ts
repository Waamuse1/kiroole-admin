import { BuildingService } from './../../../services/building.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Building } from 'src/app/models/building_res.model';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {
  buildings:Building[];

  constructor(private ngxService: NgxUiLoaderService,private toast: ToastrService,
    private buildingService:BuildingService) { }

  ngOnInit(): void {
    this.getAllBuildings();
  }
  getAllBuildings(){
    this.ngxService.start();
    this.buildingService.getAllBuilding().subscribe(res => {
      this.ngxService.stop();
      if(res.status ==200){
        this.buildings = res.body.data;
      }else{
        this.toast.error("Unable to load buildings","Error !")
      }
    },error => {
      this.ngxService.stop();

      console.log(error);
      this.toast.error("Unable to load building","Error !");
    })
  }

}
