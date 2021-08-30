import { ConfirmationModule } from './confirmation/confirmation.module';
import { HomesService } from './services/homes.service';
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
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { EditHomeComponent } from './pages/home/edit-home/edit-home.component';
import { EditCarComponent } from './pages/car-rent/edit-car/edit-car.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { AddEquipmentComponent } from './pages/equipments/add-equipment/add-equipment.component';
import { EquipmentDetailsComponent } from './pages/equipments/equipment-details/equipment-details.component';
import { EquipmentListComponent } from './pages/equipments/equipment-list/equipment-list.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

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
    EditBusinessUnitComponent,
    EditHomeComponent,
    EditCarComponent,
    EquipmentsComponent,
    AddEquipmentComponent,
    EquipmentDetailsComponent,
    EquipmentListComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgImageSliderModule,      
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    ConfirmationModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDUnDtzxWOs9Z5zBmJpNvSWq-Ttyv4vzfA',
      libraries: ['places','geometry']
    })
    
  ],
  providers: [HomesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
