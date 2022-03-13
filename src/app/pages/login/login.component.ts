import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loading = false;
  isDisabled = false;
  messajeError = '';
  messajeSuccess = '';

  constructor( private router: Router, private auth: AuthService ) { }

  ngOnInit(): void {

    // Verifica si existe una sesión persistida
    if(this.auth.user !== null)  this.router.navigate(['home']);

  }


  onSubmit(form:NgForm){

    if(form.invalid) return;

    let userName = form.controls.userName.value;
    let password = form.controls.password.value;

    this.loading = true;
    this.isDisabled = true;
    this.auth.login(userName, password).subscribe((res:any)=>{

      // Session iniciada exitosamente 
        // Renderiza el mensaje
        this.messajeSuccess= "Sessión iniciada.";

        // Persiste las credenciales
        this.auth.persistirCredenciales(res.user, res.token);

        // Redireciona al inio
        this.router.navigate(['home']);
        
        // Emite evento de sessión iniciada
        this.auth.session.emit(res.user);
      // Session iniciada exitosamente 

    }, (error)=>{

      if( error.error ){
        this.messajeError = error.error.message;
      }else{

        if( error.statusText ){
          this.messajeError = error.statusText;
        }
  
      }

      this.loading = false;
      this.isDisabled = false;

    }, ()=>{

      this.loading = false;
      this.isDisabled = false;
    });
 
  }

}
