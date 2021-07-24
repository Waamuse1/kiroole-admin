import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from 'src/app/models/equipment_res.model';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  @Input()
   equipments:Equipment[];

  constructor() { }

  ngOnInit(): void {
  }

}
