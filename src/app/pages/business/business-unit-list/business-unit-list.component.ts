import { AddBusinessUnitComponent } from './../add-business-unit/add-business-unit.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBusinessUnitComponent } from '../edit-business-unit/edit-business-unit.component';

@Component({
  selector: 'app-business-unit-list',
  templateUrl: './business-unit-list.component.html',
  styleUrls: ['./business-unit-list.component.css']
})
export class BusinessUnitListComponent implements OnInit {

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
  }
  openAddRoomModal(){
    const modalRef = this.modalService.open(AddBusinessUnitComponent);
    // modalRef.componentInstance.photoBookingDetails=this.photoBookingDetails;
    modalRef.result.then((result) => {
      // if (result) { 
      // console.log(result);
      // }
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

}
