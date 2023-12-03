import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  title:string = "Iniciar sesión";

  constructor(private router:Router) { }

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event)=>{
      if(this.router.url.includes('auth/register')){
        this.title = "Registarse";
      }else{
        this.title = "Iniciar sesión";

      }
    });
    
  }

}
