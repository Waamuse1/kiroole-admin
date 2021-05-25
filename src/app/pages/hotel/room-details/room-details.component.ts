import { AddRoomModalComponent } from './../add-room-modal/add-room-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditRoomModalComponent } from '../edit-room-modal/edit-room-modal.component';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  constructor( private modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  openAddRoomModal(){
    const modalRef = this.modalService.open(AddRoomModalComponent);
    // modalRef.componentInstance.photoBookingDetails=this.photoBookingDetails;
    modalRef.result.then((result) => {
      // if (result) { 
      // console.log(result);
      // }
      });

  }
  openEditModal(){
    const modalRef = this.modalService.open(EditRoomModalComponent);
    // modalRef.componentInstance.photoBookingDetails=this.photoBookingDetails;
    modalRef.result.then((result) => {
      // if (result) { 
      // console.log(result);
      // }
      });

  }

  

}
