import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(private fb:FormBuilder,
    private toast: ToastrService,private authService:AuthenticationService,
    private ngxService: NgxUiLoaderService,private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  get f_data() {
    return this.loginForm.controls;
  }
  onLogin(){
    this.ngxService.start();
    this.authService.login(this.f_data.email.value, this.f_data.password.value).subscribe(res => {
      this.ngxService.stop();
      if(res.status == 201){
        // redirect user to main components
        this.toast.success("Logged in Successfully","Success");
        console.log(res.body['access_token']);
        localStorage.setItem("token", res.body['access_token']);
        this.router.navigate([""]);
      }else{
        this.toast.success("Invalid email password combination","Error");
      }
    },error => {
      console.log(error);
      this.ngxService.stop();

      console.log('An error has occured');
    })
  }

}
