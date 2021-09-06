import { cities } from './../../../constants/global';
import { BuildingService } from './../../../services/building.service';
import { AgentService } from './../../../services/agent.service';
import { Agent } from './../../../models/homes_res.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css']
})
export class AddBuildingComponent implements OnInit {
  selectedFile: File
  imagePreview: string;
  images = [];
  filesToUpload: Array<File> = [];
  buildingForm:FormGroup;
   cities = cities;
latitude: number;
longitude: number;
zoom:number;
address: string;
agents:Agent[];
private geoCoder;
@ViewChild('search')
public searchElementRef: ElementRef;
amenities: FormArray;

  constructor(private mapsAPILoader: MapsAPILoader,
    private router:Router,private ngZone: NgZone,private fb:FormBuilder,
    private toast: ToastrService,private agentService:AgentService,private buildingService:BuildingService, 
    private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.setCurrentLocation();
    this.getAgents();
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
    this.buildingForm = this.fb.group({
      buildingName:['',Validators.required],
      city:['',Validators.required],
      agentId:['',Validators.required],
      address:[{value: '', disabled: true}],
      amenities:this.fb.array([this.createAmenity()])

    });    
  }
  createAmenity(): FormGroup {
    return this.fb.group({
      amenity: '',
      
    });
  }
  addAmenity(): void {
    this.amenities = <FormArray>this.buildingForm.get('amenities') as FormArray;
    this.amenities.push(this.createAmenity());
  }
  removeAmenity(index) {
    this.amenities.removeAt(index);
  }
  get f_data(){
    return this.buildingForm.controls;
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
          this.buildingForm.controls.address.setValue(this.address);
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
    let amenity:[] = this.f_data.amenities.value;
    this.ngxService.start();
    console.log("uploading images");
    let isValid = true;
    console.log(this.filesToUpload.length);
    if (this.filesToUpload.length < 1) {
      this.toast.info('Building images required',"Info")
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

  //   if (!isValid) {
  //     // return;
  // console.log('invalid checks');
  // this.ngxService.stop();
  // this.toast.info("Low resolution image","Info");
  // return;
  //   }else{
      const formData = new FormData();
    formData.append('buildingName',this.f_data.buildingName.value),
    formData.append('city',this.f_data.city.value),
    formData.append('agentId',this.f_data.agentId.value),
    formData.append('locationAddress',this.address),
    formData.append('latitude',this.latitude.toString()),
    formData.append('longitude',this.longitude.toString())

    for(let i=0; i< amenity.length; i++){
      console.log(amenity[i]['amenity']);
      formData.append('amenities',amenity[i]['amenity']);
    } 

  
      for (let i = 0; i < this.filesToUpload.length; i++) {
  
        formData.append('images', this.filesToUpload[i]);
      }

      this.buildingService.postBuilding(formData).subscribe(res => {
        this.ngxService.stop();
        if(res.status == 201){
          this.toast.success('Building details added successfully', "Success");
          this.buildingForm.reset();
          this.filesToUpload = [];
          this.router.navigate(['/business'])

        }else {
          this.toast.error('Unable to add Building details',"Error!");
        }
      }, error => {
        this.ngxService.stop();
        console.log(error);
        this.toast.error('Unable to add Building details, Try again later',"Error!");


      })

      
  
      
    // }
  }
  

  

}
