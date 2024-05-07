import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { PostpageComponent } from './pages/postpage/postpage.component';
import { AuthComponent } from './LoginPages/login/auth/auth.component';
import { LoginComponent } from './LoginPages/login/login.component';
import { CreateNewUserComponent } from './pages/userpage/create-new-user/create-new-user.component';
import { CreateNewPostComponent } from './pages/postpage/create-new-post/create-new-post.component';
import { PostComponent } from './pages/postpage/post/post.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'userpage/:id',
  component: UserpageComponent
},
{
  path: 'postpage',
  component: PostpageComponent
},
{
  path: 'post/:id',
  component: PostComponent
},
{
  path: 'auth',
  component: AuthComponent
},
{
  path: 'newUser',
  component: CreateNewUserComponent
},
{
  path: 'newPost',
  component: CreateNewPostComponent
},
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
