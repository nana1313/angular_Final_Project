import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './header/posts/posts.component';
import { FirstPageComponent } from './header/first-page/first-page.component';
import { AlbumComponent } from './header/album/album.component';
import { TodoComponent } from './header/todo/todo.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhotosComponent } from './header/photos/photos.component';
import { CommentsComponent } from './header/posts/comments/comments.component';
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FirstPageComponent,
    AlbumComponent,
    TodoComponent,

    HeaderComponent,
    PhotosComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
