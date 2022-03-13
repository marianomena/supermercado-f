import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes =[
                        {
                          path:'home',
                          component: HomeComponent
                        },
                        {
                          path:'productos',
                          component: ProductosComponent
                        },
                        {
                          path:'login',
                          component: LoginComponent
                        },
                                              
                        {path: '', redirectTo: '/home', pathMatch: 'full'},

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
