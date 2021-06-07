import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.carForm = this.fb.group({

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
  onSubmit() {
    console.log("uploading images");
    let isValid = true;
    console.log(this.filesToUpload.length);
    if (this.filesToUpload.length < 1) {
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
    }else{
      const formData = new FormData();
      // formData.append('projectId', this.projectId);
  
      for (let i = 0; i < this.filesToUpload.length; i++) {
  
        formData.append('images', this.filesToUpload[i]);
      }
  
      
    }
  }


}
