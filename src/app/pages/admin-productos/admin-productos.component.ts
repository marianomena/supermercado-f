import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';
import {MatDialog} from '@angular/material/dialog';
import { EditProductComponent } from 'src/app/components/edit-product/edit-product.component';
import { DeleteProductComponent } from 'src/app/components/delete-product/delete-product.component';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  
  listaProductos:Producto[];
  item:Producto;

  constructor( private productos:ProductosService, private dialog:MatDialog ) { 

    this.listaProductos = [];
    this.item = null;

  }

  ngOnInit(): void {
    this.getProductos();
  }


  getProductos(){

    this.productos.getProducts().then((res:any)=>{

      this.listaProductos = res;
    });

  }

  getItem(id:string){

    this.productos.getProduct(id).then((res:any)=>{

      this.item = res;

    });

  }


  edit(item:Producto){

    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '450px',
      data:{
        item: item,
        new:false
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }


  agregarProducto(){

    let item:any = {
      name:'',
      description:'',
      category:'',
      price:''
    }
    
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '450px',
      data: {
              item,
              new:true
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductos();
    });

  }


  deleteConfirmdDelete(item:Producto){

    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '350px',
      data:item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductos();
    });
        
  }

}
