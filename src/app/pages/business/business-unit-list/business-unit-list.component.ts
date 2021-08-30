import { BuildingService } from './../../../services/building.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService } from './../../../services/confirmation.service';
import { BuildingOffice } from './../../../models/building_office.res.model';
import { AddBusinessUnitComponent } from './../add-business-unit/add-business-unit.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBusinessUnitComponent } from '../edit-business-unit/edit-business-unit.component';

@Component({
  selector: 'app-business-unit-list',
  templateUrl: './business-unit-list.component.html',
  styleUrls: ['./business-unit-list.component.css']
})
export class BusinessUnitListComponent implements OnInit {
  @Input()
  buildingId;
  @Input()
  offices:BuildingOffice[];
  @Output()
   loadEvent = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal,private confirmationService:ConfirmationService,
    private ngxService: NgxUiLoaderService,private buildingService:BuildingService) { }

  ngOnInit(): void {
  }
  openAddRoomModal(){ 
    const modalRef = this.modalService.open(AddBusinessUnitComponent);
    modalRef.componentInstance.buildingId=this.buildingId;
    modalRef.result.then((result) => {      
      console.log(result);
      if (result) { 
        this.sendLoadEvent();
        console.log('send edit event');
      }
      });

  }
  openEditModal(){
    const modalRef = this.modalService.open(EditBusinessUnitComponent);
    // modalRef.componentInstance.photoBookingDetails=this.photoBookingDetails;
    modalRef.result.then((result) => {
      // if (result) { 
      // console.log(result);
      // }
      });

  }
  sendLoadEvent() {
    this.loadEvent.emit(true);
  }
  onOfficeDelete(id:any){
    console.log('office delete',id);
    this.confirmationService.confirmThis('Are you sure you want to delete this Office ?', () =>  {
      this.ngxService.start();   
      this.buildingService.deleteOffice(id).subscribe(res => {
        console.log(res);     
        
        
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
