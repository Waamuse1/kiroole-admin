import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-business-unit',
  templateUrl: './add-business-unit.component.html',
  styleUrls: ['./add-business-unit.component.css']
})
export class AddBusinessUnitComponent implements OnInit {
  businessUnitForm:FormGroup;

  constructor(private activeModal:NgbActiveModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.businessUnitForm = this.fb.group({
      name:['',Validators.required],
      status:['', Validators.required]

    })
  }
  closeModal(){
    this.activeModal.close(false);
  }

}
