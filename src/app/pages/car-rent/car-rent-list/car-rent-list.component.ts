import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CarService } from './../../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.res.model';

@Component({
  selector: 'app-car-rent-list',
  templateUrl: './car-rent-list.component.html',
  styleUrls: ['./car-rent-list.component.css']
})
export class CarRentListComponent implements OnInit {
  vehicles:Vehicle[];

  constructor(private toast: ToastrService,private carService:CarService, 
    private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.getVehicles();
  }
  getVehicles(){
    this.ngxService.start(); 
    console.log('getting homes');
    this.carService.getAllVehicles().subscribe(res => {
      this.ngxService.stop();
      this.vehicles = res.body.data;
    },error => {
      console.log(error);
      this.toast.error("Unable to get Vehicles","Error!");
      this.ngxService.stop();
    })
  }
  

}
