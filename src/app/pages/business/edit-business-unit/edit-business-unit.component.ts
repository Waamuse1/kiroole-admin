import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-business-unit',
  templateUrl: './edit-business-unit.component.html',
  styleUrls: ['./edit-business-unit.component.css']
})
export class EditBusinessUnitComponent implements OnInit {
  editBusinessUnitForm:FormGroup;

  constructor(private activeModal:NgbActiveModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.editBusinessUnitForm = this.fb.group({
      name:['',Validators.required],
      status:['',Validators.required]

    })
  }
  closeModal(){
    this.activeModal.close(false);
  }

}
