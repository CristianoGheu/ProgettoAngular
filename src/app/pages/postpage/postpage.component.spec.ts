import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { PostpageComponent } from './postpage.component';
import { HttpService } from '../../service/http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from '../../model';
import { of } from "rxjs";

describe('PostpageComponent', () => {
  let component: PostpageComponent;
  let fixture: ComponentFixture<PostpageComponent>;
  let httpClient: HttpClient;
  let service: HttpService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostpageComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "put"]);

    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new HttpService(httpClientSpy as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("can test HttpClient.get", fakeAsync(() => {
    const postTest: Post = {
      title: "title test1",
      body: "body test1 spec file",
    };
    const postTestArray: Post[] = [];

    postTestArray.push(postTest);

    const testResponse = new HttpResponse({ body: postTestArray, status: 201 });
    spyOn(service, "printPosts").and.returnValue(of(testResponse));
    component.getPost("1", "10", "");
    flush();
    expect(201).toEqual(testResponse.status);
  }));
});
