import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user;
  color;

  constructor( private auth: AuthService, private router: Router, private snackBar: MatSnackBar ) {

    this.user = null;

    this.auth.session.subscribe((user)=>{
      console.log(user)

      this.user = user;
    });

  }

  ngOnInit(): void {
    
    this.user = this.auth.user;

    this.auth.existSession().then((res:any)=>{
    
      if(res.status==false) this.logOut(false);

    }).catch(error=>{

      this.logOut(false);
    });

  }

  toGo( path: string ){

    this.router.navigate([path]);
  }

  logOut(notify=true){

    this.auth.logout();
    this.user = null;
    this.router.navigate(['/']);
    if(notify) this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Seccón cerrada.', '', { duration: 3000 } );
  }
}
