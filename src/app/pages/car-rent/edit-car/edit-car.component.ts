import { Agent } from './../../../models/agents_res.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgentService } from 'src/app/services/agent.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  selectedFile: File
  imagePreview: string;
  images = [];
  filesToUpload: Array<File> = [];
  carForm:FormGroup;
  agents:Agent[];
  vehicleId;

  constructor(private fb: FormBuilder,private toast: ToastrService,private agentService:AgentService, 
    private ngxService: NgxUiLoaderService,private carService:CarService,private router:Router,private route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.initializeForm();
    this.vehicleId =String(this.route.snapshot.paramMap.get('id')); 
    this.getAgents();
    this.carService.getSingleVehicle(this.vehicleId).subscribe(res => {
      console.log(res.body.data);
      this.carForm.patchValue({
        agentId:res.body.data.agent.id,
      vehicleMake:res.body.data.vehicleMake,
      vehicleModel:res.body.data.vehicleModel,
      manufactureYear:res.body.data.manufactureYear,
      plateNo:res.body.data.plateNo,
      noOfPassengers:res.body.data.noOfPassengers,
      ratePerDay:res.body.data.ratePerDay,
      transmission:res.body.data.transmission,
      fuel:res.body.data.fuel
        
      })
    })
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
      fuel:['',Validators.required]

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
      this.toast.info('Low Resolution image',"Warning");
      this.ngxService.stop();
      return;
 
    }else{
      const formData = new FormData();
      formData.append('agentId', this.f_data.agentId.value),
      formData.append('vehicleMake', this.f_data.vehicleMake.value),
      formData.append('vehicleModel', this.f_data.vehicleModel.value,)
      formData.append('manufactureYear', this.f_data.manufactureYear.value),
      formData.append('plateNo', this.f_data.plateNo.value),
      formData.append('noOfPassengers',this.f_data.noOfPassengers.value),
      formData.append('ratePerDay', this.f_data.ratePerDay.value),
      formData.append('transmission', this.f_data.transmission.value),
      formData.append('fuel', this.f_data.fuel.value)
  
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
