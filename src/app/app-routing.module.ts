import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './header/album/album.component';
import { FirstPageComponent } from './header/first-page/first-page.component';
import { TodoComponent } from './header/todo/todo.component';
import { PostsComponent } from './header/posts/posts.component';
import { PhotosComponent } from './header/photos/photos.component';
import { CommentsComponent } from './header/posts/comments/comments.component';
const routes: Routes = [
  { path: '', redirectTo: '/firstPage', pathMatch: 'full' },
  { path: 'firstPage', component: FirstPageComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'album/:id/photos', component: PhotosComponent },
  // { path: 'photos', component: PhotosComponent },
  { path: 'posts/:postId', component: CommentsComponent },
  { path: 'album/:albumId', component: PhotosComponent },
  { path: 'todo', component: TodoComponent },
  { path: '**', redirectTo: 'firstPage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
