import { SingleHotelRes } from './../models/single_hotel.model';
import { HotelRes } from './../models/hotels_res.model';
import { HotelRoomRes } from './../models/hotel_rooms.res.model';
import { RoomPayload } from './../payloads/room.payload';
import { config } from './../constants/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient) { }

  postHotel(formData:FormData){
    return this.http.post(`${config.apiUrl}hotels`,formData, {
      observe: "response",     
    },);
  }

  getAllHotels(){
    return this.http.get<HotelRes>(`${config.apiUrl}hotels`, {
      observe: "response",     
    });
  }
  getSingleHotel(hotelId){
    return this.http.get<SingleHotelRes>(`${config.apiUrl}hotels/${hotelId}`, {
      observe: "response",     
    });
  }
  deleteHotel(hotelId){
    return this.http.delete<any>(`${config.apiUrl}hotels/${hotelId}`, {
      observe: "response",     
    });
  }

  

  addRoom(roomPayload:RoomPayload){
    return this.http.post(`${config.apiUrl}hotelroom`,roomPayload, {
      observe: "response",     
    },);
  }

  getHotelRooms(hotelId:string){
    return this.http.get<HotelRoomRes>(`${config.apiUrl}hotelroom/${hotelId}`, {
      observe: "response",     
    });
  }

  deleteRoom(roomId){
    return this.http.delete<any>(`${config.apiUrl}hotelroom/${roomId}`, {
      observe: "response",     
    });
  }
}
