import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor(  private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteProductComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: Producto, 
    private productos:ProductosService  
  ) {}
  ngOnInit(): void {
    
  }

  
  cancelar(): void {
    this.dialogRef.close();
  }

  
  deleteItem(){
    console.log("Eliminando: ",this.data._id);

    this.productos.deleteProduct(this.data._id)
    .then((res:any)=>{
      console.log(res);
      
      if(res.status==true){

        this.dialogRef.close();
        this.openSnackBar('El item ha sido eliminado');

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
