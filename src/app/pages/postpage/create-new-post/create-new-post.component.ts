import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrls: ['./create-new-post.component.css']
})
export class CreateNewPostComponent implements OnInit{

  constructor(private http: HttpService, private router: Router, private _snackBar: MatSnackBar){}

  newPost: any = {
    title: "",
    body: "",
    userId: undefined,
  };
  ngOnInit(): void {
    
  }

  NewPost(){
    let user = JSON.parse(`${localStorage.getItem("currentUser")}`)
    this.newPost.userId = user.id;
    this.http.createPost(this.newPost, user.id).subscribe((data) => {
      if(data.status == 201){
        this._snackBar.open('New post created', 'ok', { duration: 2000});
        setTimeout(() => {
          this.router.navigate(['/postpage']);
        }, 2500);
      }
  });
  } 

}
