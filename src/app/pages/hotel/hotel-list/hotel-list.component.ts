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
    private ngxService: NgxUiLoaderService,private toast: ToastrService,) { }

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

}
