import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { AuthService } from './auth.service';

const URLBASE = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  
  constructor( private http: HttpClient, private auth:AuthService) {
    
  }
  

  getProducts(page=1, limit=25, text='', sort=1):Promise<Producto[]>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.auth.tokenSession || '',
    });

    let params = new HttpParams().set('page', page.toString())
                                 .set('limit', limit.toString())
                                 .set('text', text.toString())
                                 .set('sort', sort.toString());

    let path = 'rest/products';
    return this.http.get(`${URLBASE}/${path}`,{headers, params}).toPromise().then((res:any)=>{

      let listProducts:Producto[] = res.docsList;
      return listProducts;
    });
    
  }


  getProduct(id:string):Promise<Producto>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.auth.tokenSession || '',
    });

    let params = new HttpParams().set('id', id);

    let path = 'rest/products/item';
    return this.http.get(`${URLBASE}/${path}`,{headers, params}).toPromise().then((res:any)=>{

      let producto:Producto = res.doc;
      return producto;
    });
    
  }

  actualizarProduct(id:string, data:Producto):Promise<Boolean>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.auth.tokenSession || '',
    });

    let datos = {
      id,
      data
    } 

    let path = 'rest/products';
    return this.http.post(`${URLBASE}/${path}`, datos,{headers}).toPromise().then((res:any)=>{

      return res;
    });
    
  }

  
  crearProduct(data:Producto):Promise<Boolean>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.auth.tokenSession || '',
    });

    let path = 'rest/products';
    return this.http.put(`${URLBASE}/${path}`, data,{headers}).toPromise().then((res:any)=>{

      return res;
    });
    
  }

  
  
  deleteProduct(id:string):Promise<Boolean>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.auth.tokenSession || '',
    });

    let params = new HttpParams().set('id', id);

    let path = 'rest/products';
    return this.http.delete(`${URLBASE}/${path}`, {headers, params}).toPromise().then((res:any)=>{

      return res;
    });
    
  }



}