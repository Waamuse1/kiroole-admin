import { BuildingService } from './../../../services/building.service';
import { OfficePayload } from './../../../payloads/office.payload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-business-unit',
  templateUrl: './add-business-unit.component.html',
  styleUrls: ['./add-business-unit.component.css']
})
export class AddBusinessUnitComponent implements OnInit {
  businessUnitForm:FormGroup;
  @Input()
  buildingId;
  offices:any[];

  constructor(private activeModal:NgbActiveModal,
     private fb:FormBuilder, private buildingService:BuildingService,
     private ngxService: NgxUiLoaderService,private toast: ToastrService,) { }

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.buildingId,"from add modal");
  }
  initializeForm(){
    this.businessUnitForm = this.fb.group({
      officeName:['',Validators.required],
      description:['',Validators.required],
      size:['',Validators.required],
      floorNumber:['',Validators.required],
      paymentInterval:['',Validators.required],
      charges:['',Validators.required],
      totalUnits:['',Validators.required],
      availableUnits:['',Validators.required],
      status:['', Validators.required]

    })
  }
  get f_data(){
    return this.businessUnitForm.controls;
  }
 
  closeModal(reload:boolean){
    console.log('close modal called');
    this.activeModal.close(reload);
  }
  onSave(){
    this.ngxService.start();
    let bizUnit:OfficePayload = {
      officeName:this.f_data.officeName.value,
      description:this.f_data.description.value,
      charges:this.f_data.charges.value,
      size:this.f_data.size.value,
      availableUnits:this.f_data.availableUnits.value,
      totalUnits:this.f_data.totalUnits.value,
      floorNumber:this.f_data.floorNumber.value.split(','),
      paymentInterval:this.f_data.paymentInterval.value,
      status:true,
      buildingId:this.buildingId
    }
    this.buildingService.addOffice(bizUnit).subscribe(res => {
      this.ngxService.stop();
      if(res.status == 201){
        console.log(res.body);
        this.toast.success('Office added successfully','Success');
        this.closeModal(true);
        

      }
    }, error => {
      this.ngxService.stop();

      this.toast.error('Error unable to add office',"Error !");
      console.log(error);
    })
    
    
  }

}
