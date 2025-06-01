import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../../service/http.service';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from '../../../pages/home/home.component';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../../../model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';


describe('AuthComponent', () => {
  let component: AuthComponent;
  let component2: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;
  let services: HttpService;
  let _snackBar: MatSnackBar;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent, HomeComponent],
      providers: [HttpService, NgControl ],
      imports: [
        MatCardModule,
        HttpClientTestingModule,
        FormsModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
          {
            path: "home",
            component: HomeComponent,
          },
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, MatSnackBar],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthComponent);
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "put"]);
    router = TestBed.inject(Router);
    services = new HttpService(httpClientSpy as any);
    _snackBar = TestBed.inject(MatSnackBar);
    component = new AuthComponent(router, services, _snackBar);
    component2 = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("add user", fakeAsync(() => {
    const userTest: User = {
      name: "Angelo Rossi",
      email: "rossiangelo@gmail.com",
      gender: "male",
      status: "active",
    };
    const testResponse = new HttpResponse({ body: userTest, status: 201 });
    spyOn(services, "addUser").and.returnValue(of(testResponse));
    component.login();
    flush();
    expect(201).toEqual(testResponse.status);
  }));

  it("newCurrentUser onInit", () => {
    expect(component2.newCurrentUser).toEqual({
      name: "",
      email: "",
      gender: "",
      status: "active",
    });
  });
});
