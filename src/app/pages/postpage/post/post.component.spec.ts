import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { HttpService } from '../../../service/http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post, User } from '../../../model';
import { environment } from '../../../environments/environments';
import { of } from 'rxjs';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HttpService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule,
               HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 506 }) },
          },
        },
        HttpService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "put"]);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new HttpService(httpClientSpy as any);

    const userTest: User = {
      name: "name test",
      email: "test@test.com",
      gender: "male",
      status: "active",
      id: 6892506,
    };
    localStorage.setItem("currentUser", JSON.stringify(userTest));
    let user = JSON.parse(`${localStorage.getItem("currentUser")}`);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("can test HttpClient.get", fakeAsync(() => {
    const postTest: Post = {
      title: "title of testing post",
      body: "body of testing post",
      id: 121575,
    };

    const testResponse = new HttpResponse({ body: postTest, status: 201 });
    spyOn(service, "getPostById").and.returnValue(of(testResponse));
    component.ngOnInit();
    flush();
    expect(201).toEqual(testResponse.status);
  }));

  it("can test for 404 error", () => {
    const emsg = "deliberate 404 error";
    const postTest: Post = {
      title: "title test",
      body: "body post test",
      id: 121575,
    };

    httpClient.post<Post>(`${environment.postLink}/121575`, postTest).subscribe({
      next: () => fail("should have failed with the 404 error"),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext("status").toEqual(404);
        expect(error.error).withContext("message").toEqual(emsg);
      },
    });
    const req = httpTestingController.expectOne(`${environment.postLink}/121575`);
    req.flush(emsg, { status: 404, statusText: "Not Found" });
  });
});
