import { AddBuildingComponent } from './pages/business/add-building/add-building.component';
import { BuildingDetailsComponent } from './pages/business/building-details/building-details.component';
import { BusinessListComponent } from './pages/business/business-list/business-list.component';
import { AddHotelComponent } from './pages/hotel/add-hotel/add-hotel.component';
import { HotelListComponent } from './pages/hotel/hotel-list/hotel-list.component';
import { AddCarRentComponent } from './pages/car-rent/add-car-rent/add-car-rent.component';
import { CarRentListComponent } from './pages/car-rent/car-rent-list/car-rent-list.component';
import { AddAgentComponent } from './pages/agents/add-agent/add-agent.component';
import { AgentListComponent } from './pages/agents/agent-list/agent-list.component';
import { AddHomesComponent } from './pages/home/add-homes/add-homes.component';
import { HomesComponent } from './pages/home/homes/homes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelRoomDetailsComponent } from './pages/hotel/hotel-room-details/hotel-room-details.component';


const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"homes", component:HomesComponent},
  {path:"agents", component: AgentListComponent},
  {path:"add-agent", component:AddAgentComponent},
  {path:"add-home",component:AddHomesComponent},
  {path:"car-rent", component:CarRentListComponent},
  {path:"add-car", component:AddCarRentComponent},
  {path:"hotels", component:HotelListComponent},
  {path:"add-hotel", component:AddHotelComponent},
  {path:"hotel-room-details", component:HotelRoomDetailsComponent},
  {path:"business", component:BusinessListComponent},
  {path:"building-details",component:BuildingDetailsComponent}, 
  {path:"add-building",component:AddBuildingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
