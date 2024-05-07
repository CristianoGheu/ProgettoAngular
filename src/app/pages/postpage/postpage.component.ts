import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from '../../service/http.service';
import { Post } from '../../model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.component.html',
  styleUrls: ['./postpage.component.css']
})
export class PostpageComponent implements OnInit{
  
  posts: any = [];
  searchString!: string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageTotal!: string;
  pageSize: string = "10";

  constructor(private http: HttpService, private httpService: HttpService){}

  ngOnInit(): void {
    this.getPost('1', '10', '');
  }

  getPost(page: string, forPage: string, searchString: string) {
    let type =
      searchString
        ? "title"
        : "body";
      this.searchString = searchString;
      this.httpService
      .printPosts(page, forPage, searchString, type)
      .subscribe((response) => {
        this.posts = response.body;
        this.pageTotal = String(response.headers.get("X-Pagination-Total"));
    });
  }


  ngAfterViewInit(){
      this.paginator.page
        .pipe(
          tap(() => {
            this.getPost(
              `${this.paginator.pageIndex + 1}`,
              `${this.paginator.pageSize}`,
              this.searchString
            );
          })
        )
        .subscribe();
    }
  }

