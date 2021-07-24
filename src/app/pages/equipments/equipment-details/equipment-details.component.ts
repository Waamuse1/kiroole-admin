import { EquipmentService } from './../../../services/equipment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Agent } from './../../../models/agents_res.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { equipmentType,cities } from 'src/app/constants/global';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentService } from 'src/app/services/agent.service';


@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {
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
  equipmentId

  constructor(private mapsAPILoader: MapsAPILoader,private route:ActivatedRoute,
    private router:Router,private ngZone: NgZone,private fb:FormBuilder,private equipmentService:EquipmentService,
     private toast: ToastrService,private agentService:AgentService, private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.initializeForm();
      
    this.equipmentId =String(this.route.snapshot.paramMap.get('id')); 

    this.equipmentService.getSingleEquipments(this.equipmentId).subscribe(res => {
      this.equipmentForm.patchValue({
        equipmentName:res.body.data.equipment_name,
        desc:res.body.data.description,
        agentId:res.body.data.agent.id,
        city:res.body.data.city,
        country:res.body.data.country,
        address:res.body.data.location_address,
        type:res.body.data.type,
      });
      this.latitude = res.body.data.latitude;
      this.longitude = res.body.data.longitude;
      this.getAddress(this.latitude, this.longitude);

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
      address:[{value: '', disabled: true}]

    });

  }
  get f_data() {
    return this.equipmentForm.controls;
  }

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 15;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }

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
  onUpdate(){
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

    if (!isValid) {
      this.toast.info('Low Resolution image, Please select another Image',"Warning");
      this.ngxService.stop();
      return; 
 
    }else{
    const formData = new FormData();
    formData.append('equipment_name',this.f_data.equipmentName.value);
    formData.append('description',this.f_data.desc.value);
    formData.append('city',this.f_data.city.value);
    formData.append('type',this.f_data.type.value);
    formData.append('country',this.f_data.country.value);
    formData.append('agentId',this.f_data.agentId.value);
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

  }
   

    

  }

}
