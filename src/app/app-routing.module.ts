import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumComponent } from './components/form/form-album/album/album.component';
import { DeleteAlbumComponent } from './components/form/form-album/delete-album/delete-album.component';
import { CreateImageComponent } from './components/images/create-image/create-image.component';
import { ListImagesComponent } from './components/images/list-images/list-images.component';
import { DeleteImageComponent } from './components/images/delete-image/delete-image.component';
import { TransferImageComponent } from './components/images/transfer-image/transfer-image.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:id', component: GalleryComponent },
  { path: 'home/form-album', component: AlbumComponent },
  { path: 'home/delete-album', component: DeleteAlbumComponent },
  { path: 'home/delete-album/:id', component: DeleteAlbumComponent },
  { path: 'add-image', component: CreateImageComponent },
  { path: 'add-image/:id', component: CreateImageComponent },
  { path: 'list-images', component: ListImagesComponent },
  { path: 'delete-image', component: DeleteImageComponent },
  { path: 'delete-image/:id', component: DeleteImageComponent },
  { path: 'transfer-image', component: TransferImageComponent },
  { path: 'transfer-image/:id', component: TransferImageComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'home' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
