import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumComponent } from './components/form/form-album/album/album.component';
import { DeleteAlbumComponent } from './components/form/form-album/delete-album/delete-album.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CreateImageComponent } from './components/images/create-image/create-image.component';
import { ListImagesComponent } from './components/images/list-images/list-images.component';
import { DeleteImageComponent } from './components/images/delete-image/delete-image.component';
import { TransferImageComponent } from './components/images/transfer-image/transfer-image.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    GalleryComponent,
    AlbumComponent,
    DeleteAlbumComponent,
    FooterComponent,
    CreateImageComponent,
    ListImagesComponent,
    DeleteImageComponent,
    TransferImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
