import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HomesService } from './../../../services/homes.service';
import { ConfirmationService } from './../../../services/confirmation.service';
import { Home } from './../../../models/homes_res.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash,faInfo } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-homes-list',
  templateUrl: './homes-list.component.html',
  styleUrls: ['./homes-list.component.css']
})
export class HomesListComponent implements OnInit {
  @Input()
  homes:Home[];
  editIcon = faEdit;
  deleteIcon = faTrash;
  infoIcon = faInfo;
  @Output() deleteEvent = new EventEmitter<any>();

  constructor(private confirmationService:ConfirmationService, private homeService:HomesService,private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
  }

  onDelete(id:any){    
    this.confirmationService.confirmThis('Are you sure to delete ?', () =>  {
      this.ngxService.start();   
      this.homeService.deleteHome(id).subscribe(res => {
        console.log(res);
        this.deleteEvent.emit(true);
        this.ngxService.stop();
      }, error => {
        this.ngxService.stop();
        this.deleteEvent.emit(true);

        // console.log(error);
      })
      
    }, () => {
     console.log('cancelled');
    });
  }
  

}
