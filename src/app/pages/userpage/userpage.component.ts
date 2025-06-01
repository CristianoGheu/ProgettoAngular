import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { User } from '../../model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css', '../../style/style.css'],
})
export class UserpageComponent implements OnInit{

  selectedUser!: User;
  userEdit!: User;
  openDelete: boolean = false;
  openEdit: boolean = false;

  posts: any = [];
  seePost: boolean = false;

  selectedGenderValue: string | undefined;
  selectedStatusValue: string | undefined;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getUser();
    this.getPost();
  }

  getUser() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.http.getUserById(id).subscribe((data: any) => {
      this.selectedUser = data.body;
    });
  }

  getPost() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.http.getPostUser(id).subscribe((response) => {
      this.posts = response.body;
    });
  }

  deleteUser() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.http.deleteUser(id).subscribe();
    this._snackBar.open('User deleted', 'ok', { duration: 2000})
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 2500);
  }

  userEditClick() {
    this.openEdit = true;
    this.userEdit = this.selectedUser;
    this.getUser();
  }

  goBack() {
    console.log(this.userEdit);
    this.openEdit = false;
  }

  editUser() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.http
      .userUpdate(id, this.userEdit)
      .subscribe((data) => console.log(data.body));
      this._snackBar.open('User updated', 'ok', { duration: 2000})
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 2500);
  }

}
