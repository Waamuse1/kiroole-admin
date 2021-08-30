import { carType, listingType } from './../../../constants/global';
import { Router } from '@angular/router';
import { CarService } from './../../../services/car.service';
import { AgentService } from './../../../services/agent.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agents_res.model';

@Component({
  selector: 'app-add-car-rent',
  templateUrl: './add-car-rent.component.html',
  styleUrls: ['./add-car-rent.component.css']
})
export class AddCarRentComponent implements OnInit {
  selectedFile: File
  imagePreview: string;
  images = [];
  filesToUpload: Array<File> = [];
  carForm:FormGroup;
  agents:Agent[];
  car_Type = carType;
  listingType = listingType;

  constructor(private fb: FormBuilder,private toast: ToastrService,private agentService:AgentService, 
    private ngxService: NgxUiLoaderService,private carService:CarService,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAgents();
  }
  initializeForm(){
    this.carForm = this.fb.group({
      agentId:['',Validators.required],
      vehicleMake:['',Validators.required],
      vehicleModel:['',Validators.required],
      manufactureYear:['',Validators.required],
      plateNo:['',Validators.required],
      noOfPassengers:['',Validators.required],
      ratePerDay:['',Validators.required],
      transmission:['',Validators.required],
      fuel:['',Validators.required],
      carType:['',Validators.required],
      description:['',Validators.required],
      listingType:['',Validators.required]

    })
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
  get f_data() {
    return this.carForm.controls;
  }
  onSubmit() {
    this.ngxService.start();
    console.log("uploading images");
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
      formData.append('agentId', this.f_data.agentId.value),
      formData.append('vehicleMake', this.f_data.vehicleMake.value),
      formData.append('vehicleModel', this.f_data.vehicleModel.value,)
      formData.append('manufactureYear', this.f_data.manufactureYear.value),
      formData.append('plateNo', "KCC"),
      formData.append('noOfPassengers',this.f_data.noOfPassengers.value),
      formData.append('ratePerDay', this.f_data.ratePerDay.value),
      formData.append('transmission', this.f_data.transmission.value),
      formData.append('fuel', this.f_data.fuel.value),
      formData.append('vehicleType', this.f_data.carType.value),
      formData.append('listingType', this.f_data.listingType.value)
      formData.append('description', this.f_data.description.value)
  
      for (let i = 0; i < this.filesToUpload.length; i++) {
  
        formData.append('images', this.filesToUpload[i]);
      }
      this.carService.postVehicle(formData).subscribe(res => {
        this.ngxService.stop();
        if(res.status== 201){
          this.toast.success('Vehicle Details added successfully','Success');
          this.carForm.reset();
          this.ngxService.stop();
          this.router.navigate(['/car-rent']);

        }else {
        this.toast.error('An error has occurred, Try again Later',"Error!");

        }
      },error => {
        console.log(error);
        this.ngxService.stop();
        this.toast.error('An error has occurred, Try again Later',"Error!");
      })
  
      
    }
  }
  


}
