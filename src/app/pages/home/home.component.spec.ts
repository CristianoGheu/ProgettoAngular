import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpService } from '../../service/http.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { User } from '../../model';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let service: HttpService;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpService,
        {provide: ActivatedRoute, useValue:{}}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "put"]);

    component = fixture.componentInstance;
    service = new HttpService(httpClientSpy as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("can test HttpClient.get", fakeAsync(() => {
    const userTest: User = {
      name: "nome test",
      email: "mail test",
      gender: "male",
      status: "active",
    };
    const userTestArray: User[] = [];
    userTestArray.push(userTest);

    const testResponse = new HttpResponse({ body: userTestArray, status: 201 });
    spyOn(service, "printUsers").and.returnValue(of(testResponse));
    component.getUser("1", "10", "");
    flush();
    expect(201).toEqual(testResponse.status);
  }));
});
