import { HotelsService } from 'src/app/services/hotels.service';
import { Hotel } from './../../../models/hotels_res.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-room-details',
  templateUrl: './hotel-room-details.component.html',
  styleUrls: ['./hotel-room-details.component.css']
})
export class HotelRoomDetailsComponent implements OnInit {
  hotelId;
 id:string;
 hotel:Hotel;
 imageObject:SliderData[] = [];

  constructor(private route: ActivatedRoute,private hotelService:HotelsService) { }

  ngOnInit(): void {
     this.id = String(this.route.snapshot.paramMap.get('id'));
     this.hotelId = this.id;
     console.log(this.id);
     this.getHotelDetails();
  }
  getHotelDetails(){
    this.hotelService.getSingleHotel(this.hotelId).subscribe(res => {
      this.hotel = res.body.data;
      this.hotel.images.map(res => {
        console.log(res);
        this.imageObject.push({
          image:res,
          thumbImage:res
        });
        console.log(this.imageObject.length)
      })
    })    
    
  }

}

export class SliderData {
  image:string;
  thumbImage:string;
  title?:string;
}
