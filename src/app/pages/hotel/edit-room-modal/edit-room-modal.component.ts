import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-room-modal',
  templateUrl: './edit-room-modal.component.html',
  styleUrls: ['./edit-room-modal.component.css']
})
export class EditRoomModalComponent implements OnInit {
  editRoomForm:FormGroup;

  constructor(private activeModal:NgbActiveModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.editRoomForm = this.fb.group({
      name:['',Validators.required],
      status:['',Validators.required],

    })

  }
  closeModal(){
    this.activeModal.close(false);
  }

}
