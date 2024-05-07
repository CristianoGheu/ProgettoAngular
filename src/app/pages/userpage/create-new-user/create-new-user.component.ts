import { OriginConnectionPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../service/http.service';
import { User } from '../../../model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit{

  constructor (private router: Router, private httpService: HttpService, private _snackBar: MatSnackBar){}

  selectedGenderValue: string | undefined;

  newUser: User = {
    name: "",
    email: "",
    gender: "",
    status: "active",
  };
  
  ngOnInit(): void{

  }

  createNewUser(){
    this.httpService.addUser(this.newUser).subscribe((data) => {
      if(data.status == 201){
        this._snackBar.open('New user created', 'ok', { duration: 2000} );
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2500);
      }
    });
  }
}
