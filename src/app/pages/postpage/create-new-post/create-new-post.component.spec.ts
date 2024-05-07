import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { CreateNewPostComponent } from './create-new-post.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../../service/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { PostpageComponent } from '../postpage.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post, User } from '../../../model';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateNewPostComponent', () => {
  let component: CreateNewPostComponent;
  let fixture: ComponentFixture<CreateNewPostComponent>;
  let service: HttpService;
  let component2: CreateNewPostComponent;
  let router: Router;
  let _snackBar: MatSnackBar;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewPostComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
          { path: "postpage", component: PostpageComponent },
        ]),
      ],
      providers: [HttpService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    let httpClientSpy: { post: jasmine.Spy };
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
    service = new HttpService(<any>httpClientSpy);
    _snackBar = TestBed.inject(MatSnackBar);
    component = new CreateNewPostComponent(service, router, _snackBar);
    component2 = fixture.componentInstance;
    const userTest: User = {
      name: "name test",
      email: "test@test.com",
      gender: "male",
      status: "active",
      id: 6892506 ,
    };
    localStorage.setItem("currentUser", JSON.stringify(userTest));
    let user = JSON.parse(`${localStorage.getItem("currentUser")}`);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should create post and recive response 201 status", fakeAsync (() => {
    const post: Post = {
      title: "Title for test add post",
      body: "body for test add post",
      user_id: 6892506,
    };

    const response = new HttpResponse({
      body: post,
      status: 201,
    });

    spyOn(service, "createPost").and.returnValue(of(response));
    component.NewPost();
    flush();
    expect(201).toEqual(response.status);
  }));
});
