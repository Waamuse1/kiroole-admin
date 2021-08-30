import { ConfirmationService } from './../services/confirmation.service';
import { ConfirmationComponent } from './../pages/confirmation/confirmation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ConfirmationComponent
  ],
  providers:[
    ConfirmationService
  ]
})
export class ConfirmationModule { }
