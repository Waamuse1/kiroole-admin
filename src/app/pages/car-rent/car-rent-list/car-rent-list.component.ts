import { ConfirmationService } from './../../../services/confirmation.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  editIcon = faEdit;
  deleteIcon = faTrash;

  constructor(private toast: ToastrService,private carService:CarService, 
    private ngxService: NgxUiLoaderService,private confirmationService:ConfirmationService) { }

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
  onVehicleDelete(id){
    console.log('deleting ');
    this.confirmationService.confirmThis('Are you sure to delete ?', () =>  {
      this.ngxService.start();   
      this.carService.deleteVehicle(id).subscribe(res => {
        console.log(res);
        this.getVehicles();
        
        this.ngxService.stop();
      }, error => {
        this.ngxService.stop();
        
       

        console.log(error);
      })
      
    }, () => {
     console.log('cancelled');
    });
  }
  

}
