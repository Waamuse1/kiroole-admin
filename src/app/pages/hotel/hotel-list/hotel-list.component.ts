import { ConfirmationService } from './../../../services/confirmation.service';
import { Hotel } from './../../../models/hotels_res.model';
import { Component, OnInit } from '@angular/core';
import { faFilm,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HotelsService } from 'src/app/services/hotels.service';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;
  hotels:Hotel[];

  constructor(private hotelService:HotelsService,
    private ngxService: NgxUiLoaderService,private toast: ToastrService,private confirmationService:ConfirmationService,) { }

  ngOnInit(): void {
    this.getHotels();
  }
  
  getHotels(){
    this.ngxService.start();
    this.hotelService.getAllHotels().subscribe(res => {
      this.ngxService.stop();
      if(res.status == 200){
        this.hotels = res.body.data;

      }
    }, error => {
      console.log(error);
      this.ngxService.stop();
    })
  }
  onDelete(id:any){
    this.confirmationService.confirmThis('Are you sure to delete ?', () =>  {
      this.ngxService.start();   
      this.hotelService.deleteHotel(id).subscribe(res => {
        console.log(res);
        this.getHotels();
        
        this.ngxService.stop();
      }, error => {
        this.ngxService.stop();
        this.getHotels();
        

        // console.log(error);
      })
      
    }, () => {
     console.log('cancelled');
    });

  }

}
