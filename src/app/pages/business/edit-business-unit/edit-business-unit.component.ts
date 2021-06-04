import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-business-unit',
  templateUrl: './edit-business-unit.component.html',
  styleUrls: ['./edit-business-unit.component.css']
})
export class EditBusinessUnitComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.activeModal.close(false);
  }

}
