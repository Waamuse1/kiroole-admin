import { Component, OnInit } from '@angular/core';
import { faFilm,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

}
