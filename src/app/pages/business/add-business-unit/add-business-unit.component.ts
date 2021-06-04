import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-business-unit',
  templateUrl: './add-business-unit.component.html',
  styleUrls: ['./add-business-unit.component.css']
})
export class AddBusinessUnitComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.activeModal.close(false);
  }

}
