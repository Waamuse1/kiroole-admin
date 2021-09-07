import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentService } from 'src/app/services/agent.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { cities } from './../../../constants/global';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent implements OnInit {
  agentEditForm:FormGroup;
  city = cities;
latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private router:Router,private ngZone: NgZone,private fb:FormBuilder,
     private toastr: ToastrService,private agentService:AgentService, private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.initializeForm();

    this.setCurrentLocation();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed',()=>{
        console.log('changed')
        this.ngZone.run(()=>{
          let place:google.maps.places.PlaceResult = autocomplete.getPlace();
          autocomplete.setComponentRestrictions({
            country: ["ke"],
          })
          console.log(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
           //set latitude, longitude and zoom
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.zoom = 12
           this.getAddress(this.latitude, this.longitude);

        })

      })
    });
  }
  initializeForm(){
    this.agentEditForm = this.fb.group({
      agentName:['',Validators.required],
      ownerName:['',Validators.required],
      phoneNumber:['',Validators.required], 
      city:['',Validators.required],
      email:[''],     
      address:[{value: '', disabled: true}]

    });

  }
  get f_data() {
    return this.agentEditForm.controls;
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude, longitude) {
  
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
          console.log(this.address);
          this.agentEditForm.controls.address.setValue(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  onUpdate(){

  }



}
