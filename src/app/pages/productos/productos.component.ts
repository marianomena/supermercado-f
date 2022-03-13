import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaProductos:Producto[];

  constructor(private productos: ProductosService ) {

    this.listaProductos = [];

   }

  ngOnInit(): void {

    this.productos.getProducts().then((res:any)=>{

      this.listaProductos = res;
      console.log(res);
    });
  }

}
