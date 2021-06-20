import { Home } from './../../../models/homes_res.model';
import { HomesService } from './../../../services/homes.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {
  homes:Home[];

  constructor(private ngxService: NgxUiLoaderService, private homeService:HomesService) {

   }

  ngOnInit(): void {
    this.getHomes();
    
  }

  getHomes(){
    this.ngxService.start(); 
    console.log('getting homes');
    this.homeService.getAllHomes().subscribe(home => {
      this.ngxService.stop();
      this.homes = home.body.data;
      console.log(home.body.data);
    },error => {
      console.log(error);
      this.ngxService.stop();
    })
  }

}
