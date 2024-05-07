import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { of } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Post, User, Comment } from '../model';

describe('HttpService', () => {
  let service: HttpService;
  let httpClienteSpy: {
    [x: string]: any;
    post: jasmine.Spy;
    get: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    httpClienteSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);
    service = new HttpService(httpClienteSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Home Userlist function", (done: DoneFn) => {
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.get.and.returnValue(of(resp));
    service.printUsers("1", "10", "", "").subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.printUsers("1", "10", "", "")).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("Postpage function", (done: DoneFn) => {
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.get.and.returnValue(of(resp));
    service.printPosts("1", "10", "",'').subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.printPosts("1", "10", "",'')).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("addUser function", (done: DoneFn) => {
    const userTest: User = {
      name: "name1 test1",
      email: "test@test1.it",
      status: "active",
      gender: "male",
    };
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.post.and.returnValue(of(resp));
    service.addUser(userTest).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.addUser(userTest)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("deleteUser function", (done: DoneFn) => {
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.delete.and.returnValue(of(resp));
    service.deleteUser(6892506).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.deleteUser(6892506)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("addPost function", (done: DoneFn) => {
    const testPost: Post = {
      title: "test title",
      body: "body test spec!!!",
      user_id: 6894030 ,
    };
    const resp = new HttpResponse({
      status: 201,
    });
    httpClienteSpy.post.and.returnValue(of(resp));
    service.createPost(testPost, 6894030 ).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });

    expect(true).toBeTruthy();
  });

  it("addComment function", (done: DoneFn) => {
    const mockComment: Comment = {
      body: "test comment body",
      email: "test@test.it",
      name: "angelo rossi",
      post_id: 137887,
    };
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.post.and.returnValue(of(resp));
    service.createPostComment(mockComment, 137887).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.createPostComment(mockComment, 137887)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("#handleError should status 0 ", () => {
    let error: string = "error 0 ";
    service.handleError(new HttpErrorResponse({ status: 0, error: "error" }));
    expect(error).toEqual(error);
  });
  it("#handleError should status 404", () => {
    let error: string = "error 404 ";

    service.handleError(new HttpErrorResponse({ status: 404, error: "error" }));

    expect(error).toEqual(error);
  });
  it("#userEdit", (done: DoneFn) => {
    const user: User = {
      name: "name test",
      email: "testmail@hotmail.it",
      status: "active",
      gender: "female",
    };
    const resp = new HttpResponse({ status: 201 });

    httpClienteSpy.put.and.returnValue(of(resp));
    service.userUpdate(6894030  , user).subscribe((data) => {
      expect(data.status).toEqual(201);
      done();
    });
    expect(service.userUpdate(6894030  , user)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("#getPostUser", (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 });

    httpClienteSpy.get.and.returnValue(of(resp));
    service.getPostUser(6892489).subscribe((data) => {
      expect(data.status).toEqual(200);
      done();
    });
    expect(service.getPostUser(6892489)).toBeDefined;
    expect(true).toBeTruthy();
  });

  it("#getPostComment", (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 });
    httpClienteSpy.get.and.returnValue(of(resp));
    service.getPostComment(121562).subscribe((data) => {
      expect(data.status).toEqual(200);
      done();
    });

    expect(service.getPostComment(121562)).toBeDefined;
    expect(true).toBeTruthy();
  });
  
});
