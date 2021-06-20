import { Home } from './../../../models/homes_res.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-homes-list',
  templateUrl: './homes-list.component.html',
  styleUrls: ['./homes-list.component.css']
})
export class HomesListComponent implements OnInit {
  @Input()
  homes:Home[];

  constructor() { }

  ngOnInit(): void {
  }

}
