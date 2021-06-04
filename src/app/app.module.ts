import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './pages/common/side-nav/side-nav.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomesComponent } from './pages/home/homes/homes.component';
import { HomesListComponent } from './pages/home/homes-list/homes-list.component';
import { AddHomesComponent } from './pages/home/add-homes/add-homes.component';
import { AddAgentComponent } from './pages/agents/add-agent/add-agent.component';
import { AgentListComponent } from './pages/agents/agent-list/agent-list.component';
import { CarRentListComponent } from './pages/car-rent/car-rent-list/car-rent-list.component';
import { AddCarRentComponent } from './pages/car-rent/add-car-rent/add-car-rent.component';
import { AddHotelComponent } from './pages/hotel/add-hotel/add-hotel.component';
import { HotelListComponent } from './pages/hotel/hotel-list/hotel-list.component';
import { HotelRoomDetailsComponent } from './pages/hotel/hotel-room-details/hotel-room-details.component';
import { RoomDetailsComponent } from './pages/hotel/room-details/room-details.component';
import { AddRoomModalComponent } from './pages/hotel/add-room-modal/add-room-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditRoomModalComponent } from './pages/hotel/edit-room-modal/edit-room-modal.component';
import { BusinessListComponent } from './pages/business/business-list/business-list.component';
import { AddBuildingComponent } from './pages/business/add-building/add-building.component';
import { AddBusinessUnitComponent } from './pages/business/add-business-unit/add-business-unit.component';
import { BusinessUnitListComponent } from './pages/business/business-unit-list/business-unit-list.component';
import { BuildingDetailsComponent } from './pages/business/building-details/building-details.component';
import { EditBusinessUnitComponent } from './pages/business/edit-business-unit/edit-business-unit.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    DashboardComponent,
    HomesComponent,
    HomesListComponent,
    AddHomesComponent,
    AddAgentComponent,
    AgentListComponent,
    CarRentListComponent,
    AddCarRentComponent,
    AddHotelComponent,
    HotelListComponent,
    HotelRoomDetailsComponent,
    RoomDetailsComponent,
    AddRoomModalComponent,
    EditRoomModalComponent,
    BusinessListComponent,
    AddBuildingComponent,
    AddBusinessUnitComponent,
    BusinessUnitListComponent,
    BuildingDetailsComponent,
    EditBusinessUnitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_V9DCFWNkafi4QjyV--pdRL7wGO29-0Q'
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
