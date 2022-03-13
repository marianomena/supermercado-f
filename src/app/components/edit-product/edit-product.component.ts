import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface dialogCustom {
  item: Producto,
  new: boolean
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  producto:Producto;
  modo:string;
  
  constructor(  private snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<EditProductComponent>,  
                @Inject(MAT_DIALOG_DATA) public data: dialogCustom, private productos:ProductosService  
              ) {
                
                this.modo = 'update';
                this.producto={
                      name:'',
                      description:'',
                      category:'',
                      price: -1
                    };
                   }

  ngOnInit(): void {

    if(this.data.new){
      this.modo = 'create';
    }else{
      this.modo = 'update';
    }
    
  }

  cancelar(): void {

    this.dialogRef.close();
  }

  actualizar(campo:string, control){

    
    switch (campo) {
      case 'name':
        this.producto.name = control.value;
        break;
        case 'description':
          this.producto.description = control.value;
          break;

        case 'category':
          this.producto.category = control.value;
          break;
  
        case 'price':
          this.producto.price = control.value;
          break;

            default:
        break;
    }
  }



  async guardarItem(){

    let cambios:any = {};

    if(this.producto.name!='' && this.producto.name!=this.data.item.name) cambios.name = this.producto.name;
    if(this.producto.description!='' && this.producto.description!=this.data.item.description) cambios.description = this.producto.description;
    if(this.producto.category!='' && this.producto.category!=this.data.item.category) cambios.category = this.producto.category;
    if(this.producto.price!=-1 && this.producto.price!=this.data.item.price) cambios.price = this.producto.price;

    this.productos.actualizarProduct(this.data.item._id, cambios)
                  .then((res:any)=>{

                    if(res.status==true){

                      this.actualizarData(cambios);
                      this.dialogRef.close();
                      this.openSnackBar('Item actualizado con éxito');
                    }else{

                      this.openSnackBar(res.message);
                    }
                  })
                  .catch(err=>{
                  
                    console.log(err);
                    this.openSnackBar(err.message);

                  });
    
  }

  actualizarData(cambios:Producto){

    if(cambios.name && cambios.name!=this.data.item.name) this.data.item.name = cambios.name;
    if(cambios.description && cambios.description!=this.data.item.description) this.data.item.description = cambios.description;
    if(cambios.category && cambios.category!=this.data.item.category) this.data.item.category = cambios.category;
    if(cambios.price && cambios.price!=this.data.item.price) this.data.item.price = cambios.price;

  }

  crearItem(){

    this.productos.crearProduct(this.producto)
    .then((res:any)=>{

      if(res.status==true){

        this.dialogRef.close();
        this.openSnackBar('Item actualizado con éxito');

      }else{

        this.openSnackBar(res.message);
      }
    })
    .catch(err=>{
    
      console.log(err);
      this.openSnackBar(err.message);

    });

  }

  openSnackBar(message:string) {
    this.snackBar.open(message, '', { duration: 3000 } );
  }
}
