import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';


const URLBASE = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User;
  tokenSession:string;
  session:EventEmitter<User|boolean>

  constructor( private http: HttpClient, private snackBar: MatSnackBar ) {
    this.user = null;
    this.tokenSession = null;
    this.session = new EventEmitter();

    this.iniciarCredenciales();
  }

  iniciarCredenciales(){

    // Recupera del storage los datos del usuario logueado
    let strUser = localStorage.getItem('user');
    if(strUser!==null){

      let user = JSON.parse(strUser);
      this.user = user;
    } 
    
    // Recupera del storage el token de sessión del usuario logueado
    let token = localStorage.getItem('token');
    if(token!==null) this.tokenSession = token; 

    console.log('Credenciales inicializadas.',this.user,this.tokenSession);
  }

  login( userName: string, password:string ){
    
    let path = 'rest/auth';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let data = {userName, password};
    return this.http.post(
                          `${URLBASE}/${path}`, 
                          data,
                          {
                           headers
                          }
                        )
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;
    this.tokenSession = null;
    this.session.emit(false);
  }

  persistirCredenciales(user:User, token:string){

    this.user = user;
    this.tokenSession = token;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  existSession(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.tokenSession || '',
    });

    let path = 'rest/scope2';

    return this.http.get(`${URLBASE}/${path}`,{headers}).toPromise().then(res=>{

      return res;
    });
  }

  guard(scope:string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.tokenSession || ''
    });

    let path = 'rest/scope2';
    return this.http.post(`${URLBASE}/${path}`,{path: scope},{headers}).toPromise().then((res:any)=>{


      if(!res.status){
        this.logout();
        this.openSnackBar(res.message);
      }
      return res;

    }).catch(error=>{
      this.logout();

      if(error.error){
        this.openSnackBar(error.error.message);
      } else{
        this.openSnackBar(error.message);
      }

      return error;

    });
  }

  
  openSnackBar(message:string) {
    this.snackBar.open(message, '', { duration: 3000 } );
  }

}


export interface User {
  userName:string,
  firsName?:string,
  lastName?:string,
  token?:string
}