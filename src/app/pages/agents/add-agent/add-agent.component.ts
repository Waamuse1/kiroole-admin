import { cities } from './../../../constants/global';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentPayload } from './../../../payloads/agent.payload';
import { AgentService } from './../../../services/agent.service';
import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {
  agentForm:FormGroup;
  cities = cities;
latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private router:Router,private ngZone: NgZone,private fb:FormBuilder,
     private toastr: ToastrService,private agentService:AgentService, private ngxService: NgxUiLoaderService, ) { }

  ngOnInit(): void {    
    this.initializeForm();
    this.setCurrentLocation();
    this.initializeForm();
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
    this.agentForm = this.fb.group({
      agentName:['',Validators.required],
      ownerName:['',Validators.required],
      phoneNumber:['',Validators.required], 
      city:['',Validators.required],
      email:[''],     
      address:[{value: '', disabled: true}]

    });

  }
  get f_data() {
    return this.agentForm.controls;
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
          this.agentForm.controls.address.setValue(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  onsubmit(){
    this.ngxService.start();
    var agent:AgentPayload = {
      "agentName":this.f_data.agentName.value,
      "ownerName":this.f_data.ownerName.value,
      "city":this.f_data.city.value,
      "phoneNumber":this.f_data.phoneNumber.value.toString(),
      "locationAddress":this.address,
      "latitude":this.latitude,
      "longitude":this.longitude,
      "isActive":true
    }

    this.agentService.createAgent(agent).subscribe(res=>{
      this.ngxService.stop();
      console.log(res.status);
      console.log(res.body);
      if(res.status == 201){
        this.toastr.success('Agent Added Successfully', 'Success ');
        this.router.navigate(['/agents']);
      }else {
        this.toastr.error("Unable to add agent Please try again later","Error!");
      }
    },error=>{
      console.log(error);
      this.toastr.error("Unable to add agent Please try again later","Error!");

      this.ngxService.stop();

    })

  }

}
