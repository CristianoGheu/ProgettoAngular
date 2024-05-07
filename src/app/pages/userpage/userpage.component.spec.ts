import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { UserpageComponent } from './userpage.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpService } from '../../service/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../../model';

describe('UserpageComponent', () => {
  let component: UserpageComponent;
  let fixture: ComponentFixture<UserpageComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HttpService;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };
  let _snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserpageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 5674 }) },
          },
        },
        HttpService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserpageComponent);
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "put"]);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new HttpService(httpClientSpy as any);
    _snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("can test Httpclient.get", fakeAsync(() => {
    const userTest: User = {
      name: "name test",
      email: "mail test",
      gender: "male",
      status: "active",
      id: 6892506,
    };
    const testResponse = new HttpResponse({ body: userTest, status: 201 });
    spyOn(service, "getUserById").and.returnValue(of(testResponse));
    component.getUser();
    flush();
    expect(201).toEqual(testResponse.status);
  }));
});
