import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {
  agentForm:FormGroup;
  cities = [
    "Hargeisa", "Berbera",  "Burco", "Moqadisho"

];
latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private router:Router,private ngZone: NgZone,private fb:FormBuilder) { }

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
      address:[{value: '', disabled: true}]

    });

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

}
