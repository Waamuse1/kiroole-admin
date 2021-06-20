import { AgentRes } from './../models/agents_res.model';
import { AgentPayload } from './../payloads/agent.payload';
import { Agent } from './../models/homes_res.model';
import { config } from './../constants/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { 

  }
  createAgent(agent:AgentPayload){
    return this.http.post(`${config.apiUrl}agent`,agent,{observe:'response'})
  }
  getAllAgents(){
    return this.http.get<AgentRes>(`${config.apiUrl}agent`, {
      observe: "response",     
    });
  }
 
}
