import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [HomeComponent, ProductosComponent, LoginComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
    HomeComponent,
    ProductosComponent,
    LoginComponent

  ]
})
export class PagesModule { }
