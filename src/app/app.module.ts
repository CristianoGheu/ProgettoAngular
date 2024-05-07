import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import{MatMenuModule} from '@angular/material/menu';
import{MatButtonModule} from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import{MatExpansionModule} from '@angular/material/expansion';
import{MatListModule} from '@angular/material/list';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule, } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { PostpageComponent } from './pages/postpage/postpage.component';
import { LoginComponent } from './LoginPages/login/login.component';
import { CreateNewPostComponent } from './pages/postpage/create-new-post/create-new-post.component';
import { CreateNewUserComponent } from './pages/userpage/create-new-user/create-new-user.component';
import { AuthComponent } from './LoginPages/login/auth/auth.component';
import { PostComponent } from './pages/postpage/post/post.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserpageComponent,
    PostpageComponent,
    LoginComponent,
    CreateNewPostComponent,
    CreateNewUserComponent,
    AuthComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
