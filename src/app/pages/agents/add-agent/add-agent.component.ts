import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {
  cities = [
    "Hargeisa", "Berbera",  "Burco", "Moqadisho"

];

  constructor() { }

  ngOnInit(): void {
  }

}
