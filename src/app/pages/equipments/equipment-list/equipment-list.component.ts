import { ConfirmationService } from './../../../services/confirmation.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from 'src/app/models/equipment_res.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;
  @Input()
   equipments:Equipment[];

  constructor(private confirmationService:ConfirmationService,private ngxService: NgxUiLoaderService, private equipmentService:EquipmentService) { }

  ngOnInit(): void {
  }
  onDelete(id){
    console.log('deleting');
    this.confirmationService.confirmThis('Are you sure to delete ?', () =>  {
      this.ngxService.start();   
      this.equipmentService.deleteEquipment(id).subscribe(res => {
        console.log(res);
        // refresh the list 
        
        this.ngxService.stop();
      }, error => {
        this.ngxService.stop();
        
       

        console.log(error);
      })
      
    }, () => {
     console.log('cancelled');
    });

  }

}
