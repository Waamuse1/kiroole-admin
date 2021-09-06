import { Agent } from './../../../models/agents_res.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentService } from 'src/app/services/agent.service';
import { AgentPayload } from 'src/app/payloads/agent.payload';
import { equipmentType, cities, listingType } from 'src/app/constants/global';
@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  equipmentForm:FormGroup;
  // cities = cities;
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  agents:Agent[];
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  equipmentType = equipmentType;
  cities = cities;
  images = [];
  filesToUpload: Array<File> = [];
  listingType = listingType;


  constructor(private mapsAPILoader: MapsAPILoader,
    private router:Router,private ngZone: NgZone,private fb:FormBuilder,
     private toast: ToastrService,private agentService:AgentService, private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setCurrentLocation();
    this.initializeForm();
    this.getAgents();
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
  getAgents(){
    this.ngxService.start();
    this.agentService.getAllAgents().subscribe(agent => {
      this.ngxService.stop();
      if(agent.status == 200){
        this.agents = agent.body.data;
        console.log(agent.body.data);
      }else{
        this.toast.error("Unable to get agents","Error!")
      }
    }, error => {
      console.log(error);
      this.toast.error("Unable to get agents","Error!")
      this.ngxService.stop();
    })

  }

  initializeForm(){
    this.equipmentForm = this.fb.group({
      equipmentName:['',Validators.required],
      desc:['',Validators.required],
      agentId:['',Validators.required], 
      city:['',Validators.required],
      country:['',Validators.required],
      type:['', Validators.required],     
      address:[{value: '', disabled: true}],
      price:['',Validators.required],
      listingType:['',Validators.required]

    });

  }
  get f_data() {
    return this.equipmentForm.controls;
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
          this.equipmentForm.controls.address.setValue(this.address);
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
   console.log(this.filesToUpload);

  }

  onsubmit(){
    console.log("submitting data");
    // this.ngxService.start();
    let isValid = true;
    console.log(this.filesToUpload.length);
    if (this.filesToUpload.length < 1) {
      this.toast.info('Image requires',"Images Missing");
      this.ngxService.stop();
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

    // if (!isValid) {
    //   this.toast.info('Low Resolution image, Please select another Image',"Warning");
    //   this.ngxService.stop();
    //   return; 
 
    // }else{
    const formData = new FormData();
    formData.append('equipment_name',this.f_data.equipmentName.value);
    formData.append('description',this.f_data.desc.value);
    formData.append('city',this.f_data.city.value);
    formData.append('type',this.f_data.type.value);
    formData.append('country',this.f_data.country.value);
    formData.append('agentId',this.f_data.agentId.value);
    formData.append('price',this.f_data.price.value);
    formData.append('listingType',this.f_data.listingType.value);
    formData.append('location_address',this.address);
    formData.append('latitude', this.latitude.toString());
    formData.append('longitude',this.longitude.toString());

    for (let i = 0; i < this.filesToUpload.length; i++) {
  
      formData.append('images', this.filesToUpload[i]);
    }

    this.agentService.postEquipment(formData).subscribe(res => {
      this.ngxService.stop();
      console.log(res);
      if(res.status == 201){
        this.toast.success("Equipment added successfully ","Success");
        this.filesToUpload = [];
        this.router.navigate(['/equipments']);
        this.equipmentForm.reset();

      }else{
        this.toast.error('An error has occurred please try again later','Error');
      }
      console.log(res.body);
      console.log(res.status);
    },error => {
      this.ngxService.stop();
      this.toast.error('An error has occurred please try again later','Error');
      console.log('an error has occured');
      console.log(error);
    })

  // }
   

    

  }

}
