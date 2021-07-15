import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RoomPayload } from './../../../payloads/room.payload';
import { HotelsService } from './../../../services/hotels.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.css']
})
export class AddRoomModalComponent implements OnInit {
  roomForm:FormGroup;
  @Input()
  hotelId:string;

  constructor(private activeModal:NgbActiveModal,
     private fb:FormBuilder, private hotelService:HotelsService
     ,private ngxService: NgxUiLoaderService,private toast: ToastrService, ) { }

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.hotelId);
  }
  initializeForm(){
    this.roomForm = this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      noOfPeople:['',Validators.required],
      chargesPerDay:['',Validators.required],
      totalUnits:['',Validators.required],
      availableUnits:['',Validators.required],
      status:['',Validators.required],

    })
  }

  

  closeModal(reload:boolean){
    this.activeModal.close(reload);
  }
  get f_data(){
    return this.roomForm.controls;
  }
  onSave(){
    console.log('adding room');
    this.ngxService.start();
    let room:RoomPayload = {
      name:this.f_data.name.value,
      description:this.f_data.description.value,
      noOfPeople:this.f_data.noOfPeople.value,
      chargesPerDay:this.f_data.chargesPerDay.value,
      totalUnits:this.f_data.totalUnits.value,
      availableUnits:this.f_data.availableUnits.value,
      status:this.f_data.status.value,
      hotelId:this.hotelId      
    }
    this.hotelService.addRoom(room).subscribe(res => {
      this.ngxService.stop()
      if(res.status == 201){
        this.toast.success('Room added successfully','Success !');
        this.closeModal(true);

      }
    }, error => {
      this.ngxService.stop()
      console.log(error);

    })

  }

}
