import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.css']
})
export class AddRoomModalComponent implements OnInit {
  roomForm:FormGroup;

  constructor(private activeModal:NgbActiveModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.roomForm = this.fb.group({
      name:['',Validators.required],
      status:['',Validators.required],

    })
  }

  closeModal(){
    this.activeModal.close(false);
  }

}
