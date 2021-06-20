import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from './../../../services/agent.service';
import { Component, OnInit } from '@angular/core';
import { faFilm,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Agent } from 'src/app/models/agents_res.model';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;
  agents:Agent[];

  constructor(private toastr: ToastrService,private agentService:AgentService, 
    private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.getAgents();
  }
  getAgents(){
    this.ngxService.start();
    this.agentService.getAllAgents().subscribe(agent => {
      this.ngxService.stop();
      if(agent.status == 200){
        this.agents = agent.body.data;
        console.log(agent.body.data);
      }else{
        this.toastr.error("Unable to get agents","Error!")
      }
    }, error => {
      console.log(error);
      this.toastr.error("Unable to get agents","Error!")
      this.ngxService.stop();
    })

  }

}
