import { Component, OnInit } from '@angular/core';
import { User } from '../../../model';
import { Router } from '@angular/router';
import { HttpService } from '../../../service/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent{

  newCurrentUser: User = {
    name: "",
    email: "",
    gender: "",
    status: "active",
  };
  user!: User; 
  tokenKey!: string;
  

  constructor(private router: Router, private http: HttpService,
     private _snackBar: MatSnackBar){}


  login(){
    localStorage.setItem('token', this.tokenKey);
    this.http.addUser(this.newCurrentUser).subscribe((data : any) => {
      if(data.status == 201){
        this.user = data.body;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this._snackBar.open('Login success', 'ok', { duration: 2000});
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2500);
      }
    });

  }

}
