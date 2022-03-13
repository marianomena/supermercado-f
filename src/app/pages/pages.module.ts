import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';




@NgModule({
  declarations: [HomeComponent, ProductosComponent, LoginComponent, AdminProductosComponent],
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
    LoginComponent, 
    AdminProductosComponent

  ]
})
export class PagesModule { }
