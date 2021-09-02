import { AuthGuardService } from './services/auth-guard.service';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { AddEquipmentComponent } from './pages/equipments/add-equipment/add-equipment.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { EditHomeComponent } from './pages/home/edit-home/edit-home.component';
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
import { EditCarComponent } from './pages/car-rent/edit-car/edit-car.component';
import { EquipmentDetailsComponent } from './pages/equipments/equipment-details/equipment-details.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:MainComponent, canActivate: [AuthGuardService], children:[
  {path:"dashboard",component:DashboardComponent},
  {path:"",redirectTo:'/homes',pathMatch:'full'},
  {path:"homes", component:HomesComponent},
  {path:'equipments',component:EquipmentsComponent},
  {path:'equipment-details',component:EquipmentDetailsComponent},
  {path:"home-details/:id", component:EditHomeComponent},
  {path:"agents", component: AgentListComponent},
  {path:"add-agent", component:AddAgentComponent},
  {path:"add-home",component:AddHomesComponent},
  {path:"car-rent", component:CarRentListComponent},
  {path:"add-car", component:AddCarRentComponent},
  {path:"car-details/:id", component:EditCarComponent},
  {path:"hotels", component:HotelListComponent},
  {path:"add-hotel", component:AddHotelComponent},
  {path:"hotel-room-details/:id", component:HotelRoomDetailsComponent},
  {path:"business", component:BusinessListComponent},
  {path:"building-details/:id",component:BuildingDetailsComponent}, 
  {path:"add-building",component:AddBuildingComponent},
  {path:"add-equipment",component:AddEquipmentComponent},
  {path:"equipment-details/:id", component:EquipmentDetailsComponent},

  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
