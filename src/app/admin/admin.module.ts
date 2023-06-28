import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectmoduleComponent } from './projectmodule/projectmodule.component';
import { ProjecttasksComponent } from './projecttasks/projecttasks.component';


@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    EmployeesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProjectsComponent,
    ProjectmoduleComponent,
    ProjecttasksComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
