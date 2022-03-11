import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  
  
  listaProductos:Producto[];

  constructor( ) {

    this.listaProductos = [];

   }

  ngOnInit(): void {

  }

}
