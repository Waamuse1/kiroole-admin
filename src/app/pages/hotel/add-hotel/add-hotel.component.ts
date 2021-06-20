import { HotelsService } from 'src/app/services/hotels.service';
import { Agent } from './../../../models/homes_res.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentService } from './../../../services/agent.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  selectedFile: File
  imagePreview: string;
  images = [];
  hotelForm: FormGroup;

  filesToUpload: Array<File> = [];
  cities = [
    "Hargeisa", "Berbera", "Burco", "Moqadisho"

  ];

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  agents: Agent[];


  constructor(private mapsAPILoader: MapsAPILoader,
    private router: Router, private ngZone: NgZone,
    private fb: FormBuilder, private toast:
      ToastrService, private agentService: AgentService,
      private hotelService:HotelsService,
    private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.setCurrentLocation();
    this.initializeForm();
    this.getAgents();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        console.log('changed')
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
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
  initializeForm() {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      city: ['', Validators.required],
      ownerId: ['', Validators.required],
      noOfRooms: [''],
      contact: ['', Validators.required],
      address: [{ value: '', disabled: true }],


    })
  }
  get f_data() {
    return this.hotelForm.controls;
  }
  getAgents() {
    this.ngxService.start();
    this.agentService.getAllAgents().subscribe(agent => {
      this.ngxService.stop();
      if (agent.status == 200) {
        this.agents = agent.body.data;
        console.log(agent.body.data);
      } else {
        this.toast.error("Unable to get agents", "Error!")
      }
    }, error => {
      console.log(error);
      this.toast.error("Unable to get agents", "Error!")
      this.ngxService.stop();
    })

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
          this.hotelForm.controls.address.setValue(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  onFileChanged(event) {
    console.log("called");
    this.filesToUpload = event.target.files;
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          let payload = {
            url: event.target.result,
            isValid: true,
          };

          console.log(payload);
          this.images.push(payload);

        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }

  }
  removeImage(index) {
    console.log(index);
    this.images.splice(index, 1);

    let tempList = [];
    for (var j = 0; j < this.filesToUpload.length; j++) {
      if (j != index)
        tempList.push(this.filesToUpload[j]);
    }

    this.filesToUpload = tempList;


    // this.filesToUpload = this.filesToUpload[index] = null;

    // this.filesToUpload = this.filesToUpload.filter((item, i) => i !== index);
    console.log(this.filesToUpload);

  }
  onSubmit() {
    this.ngxService.start();
    console.log("uploading images");
    let isValid = true;
    console.log(this.filesToUpload.length);
    if (this.filesToUpload.length < 1) {
      this.ngxService.stop()
      return;
    }

    for (let i = 0; i < this.images.length; i++) {
      let domImage = document.getElementById(`image${i}`) as HTMLImageElement;
      console.log(domImage);
      if (domImage.naturalWidth < 600 || domImage.naturalHeight < 600) {
        this.images = this.images.map((item, index) => {
          if (index === i) {
            item.isValid = false;
            return item;
          }
          return item;
        });
        isValid = false;
      }
    }

    if (!isValid) {
      // return;
      console.log('invalid checks')
    } else {
      const formData = new FormData();
      formData.append("hotelName", this.f_data.hotelName.value),
      formData.append("city", this.f_data.city.value),
      formData.append("ownerId", this.f_data.ownerId.value),
      formData.append("locationAddress", this.address),
      formData.append("noOfRooms", this.f_data.noOfRooms.value),
      formData.append("contact", this.f_data.contact.value),
      formData.append("latitude", this.latitude.toString()),
      formData.append("longitude", this.longitude.toString())
      // formData.append("isActive",true),    

      for (let i = 0; i < this.filesToUpload.length; i++) {

        formData.append('images', this.filesToUpload[i]);
      }

      this.hotelService.postHotel(formData).subscribe(res => {
        this.ngxService.stop();
        if(res.status == 201){
          this.toast.success("Hotel Details added","Success");
        }else{
          this.toast.error("An error has Occurred","Error");
        }
      }, error => {
        console.log(error);
        this.ngxService.stop();
        this.toast.error("An error has Occurred, Try again later","Error");

        
      })
      


    }
  }
  


}
