import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../service/http.service';
import { Post, User, Comment} from '../../../model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  id_post = Number(this.route.snapshot.paramMap.get("id"));
  user: User = JSON.parse(`${localStorage.getItem("currentUser")}`);

  post: Post = {
    title: "",
    body: "",
  };
  comments: Comment[] = [];
  addComment!: boolean;
  newComment: Comment = {
    post_id: this.id_post,
    name: "",
    email: "",
    body: "",
  };

  constructor(private router: Router, private http: HttpService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.http.getPostById(this.id_post).subscribe((response: any) => {
      this.post = response.body;
    });
    this.loadComment();
  }

  loadComment() {
    this.http.getPostComment(this.id_post).subscribe((data: any) => {
      this.comments = data.body;
    });
  }

  addNewComment() {
    this.newComment.name = this.user.name;
    this.newComment.email = this.user.email;
    console.log(this.newComment);
    this.http
      .createPostComment(this.newComment, this.id_post)
      .subscribe((data) => {
        this.loadComment();
      });
    this.addComment = false;
    this.newComment.body = "";
  }
}
