import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { User } from '../../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../style/style.css'],
})
export class HomeComponent implements OnInit, AfterViewInit{

  constructor(private httpService: HttpService, private router: Router,
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  users: any = [];
  newUser?: User;
  searchString!: string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageTotal!: string;
  pageSize: string = "10";
  

  ngOnInit(): void {
    this.getUser("1", "10", "");
  }

  getUser(pageN: string, forPage: string, searchString: string) {
    let type =
      searchString.includes("@") || searchString.includes("_")
        ? "email"
        : "name";
    this.searchString = searchString;
    this.httpService
      .printUsers(pageN, forPage, searchString, type)
      .subscribe((response) => {
        this.users = response.body;
        this.pageTotal = String(response.headers.get("X-Pagination-Total"));
      });
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => {
          this.getUser(
            `${this.paginator.pageIndex + 1}`,
            `${this.paginator.pageSize}`,
            this.searchString
          );
        })
      )
      .subscribe();
  }
}
