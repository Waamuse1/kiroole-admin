import { Room } from './../../../models/hotel_rooms.res.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HotelsService } from './../../../services/hotels.service';
import { AddRoomModalComponent } from './../add-room-modal/add-room-modal.component';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditRoomModalComponent } from '../edit-room-modal/edit-room-modal.component';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  @Input()
  hotelId:string;
  hotelRooms:Room[];

  constructor( private modalService: NgbModal,private hotelService:HotelsService,
    private ngxService: NgxUiLoaderService,private toast: ToastrService,) { }

  ngOnInit(): void {
    console.log(this.hotelId, "room details component")
    this.getHotelRooms();
  }

  getHotelRooms(){
    this.ngxService.start();
    this.hotelService.getHotelRooms(this.hotelId).subscribe(res=>{
      this.ngxService.stop();
      if(res.status ==200 ){
        this.hotelRooms = res.body.data;
        console.log(res.body.data);
      }else{
        this.toast.error("Unable to get Hotel rooms", "Error!")
      }

    }, error =>{
      this.ngxService.stop();
      this.toast.error("Unable to get Hotel rooms", "Error!")
      console.log(error);

    })
  }

  openAddRoomModal(){
    const modalRef = this.modalService.open(AddRoomModalComponent);
    modalRef.componentInstance.hotelId = this.hotelId;    
    modalRef.result.then((result) => {
      if (result) { 
      console.log(result);
      this.getHotelRooms();
      }
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
