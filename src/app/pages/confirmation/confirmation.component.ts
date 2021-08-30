import { ConfirmationService } from './../../services/confirmation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  message: any;

  constructor(private confirmService: ConfirmationService) { }

  ngOnInit(): any {
    /** 
        *   This function waits for a message from alert service, it gets 
        *   triggered when we call this from any other component 
        */  
     this.confirmService.getMessage().subscribe(message => {  
      this.message = message;  
  });
  }

}
