import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import { ImagesService } from 'src/app/services/images.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  albums: any[] = [];
  images: any[] = [];
  imagesAlbum: any[] = [];
  imageAlbumFirst: any;
  galleryEmpty = true;
  id: string;
  imageDatail: string;
  valueButton: boolean = false;
  details: any;

  constructor(private albumsService: AlbumsService,
    private imagesService: ImagesService,
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    // receiving url id ---------------
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'] || null;
    });
    this.loadData();

    // Disable the "back" button  -------------
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
  }


  // -------------------------------------

  loadData(){
    // list albums
    this.albumsService.albumsList().subscribe((albums) =>{
      this.albums = albums.albumBD;
      // console.log('Estos son los albums', this.albums);


                // list images
          this.imagesService.imageList().subscribe(images =>{
            this.images = images.image;
            // console.log('Estos son las images', this.images);


            // finding the images according to the albums and classifying them    ------------------
                this.albums.forEach(album => {
                    album.images.forEach(image => {
                        if(this.id == album._id){
                          if(album.images.length>0){
                            this.galleryEmpty = true;
                            this.images.forEach(img => {
                                if(image == img._id){
                                  this.imagesAlbum.push(img);
                                }
                            });
                          }else{
                            this.galleryEmpty = false;
                          }
                        }
                    });
                });

                // Validating empty data to load static images  ----------
                if( this.imagesAlbum.length <= 0 || this.albums.length <= 0){
                  const empty = {
                    name: '',
                    description: '',
                    album: '',
                    date: null,
                    path: '/assets/images/empty.jpg'
                  }
                  this.imageDatail = '/assets/images/empty.jpg';
                  this.imageAlbumFirst = empty;
                  this.imagesAlbum[0] = empty;
                  this.details = empty;
                }else{
                  this.imageDatail = 'http://localhost:3000/' + this.imagesAlbum[0].path;
                  this.details = this.imagesAlbum[0];
                  this.imageAlbumFirst= this.imagesAlbum[0];
                  this.imagesAlbum.splice(0, 1);
                  this.valueButton = true;
                }
          })
  
    })
  }

  
  // Creating the object of the image details   --------------
  seeDetails(image: any){
    this.details = image;
    this.imageDatail = 'http://localhost:3000/' + this.details.path;
  }

  // Activate form to add an image   -------
  addImage(){
   this.router.navigate(['../add-image'], { queryParams: { id: this.id} });
  }
}
