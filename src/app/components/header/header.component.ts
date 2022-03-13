import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor( private router: Router ) {


  }

  ngOnInit(): void {
    
  }

  toGo( path: string ){

    this.router.navigate([path]);
  }


}
