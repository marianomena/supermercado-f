import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';

const URLBASE = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  
  constructor( private http: HttpClient) {
    
  }
  

  getProducts(page=1, limit=25, text='', sort=1):Promise<Producto[]>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
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



}