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

  constructor(private albumsService: AlbumsService,
    private imagesService: ImagesService,
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'] || null;
    });
    this.loadData();
    // this.imageDatail = '/assets/images/empty.jpg';
  }


  // -------------------------------------
 valueButton: boolean = false;
  loadData(){
    // list albums
    this.albumsService.albumsList().subscribe((albums) =>{
      this.albums = albums.albumBD;
      // console.log('Estos son los albums', this.albums);


                // list images
          this.imagesService.imageList().subscribe(images =>{
            this.images = images.image;
            // console.log('Estos son las images', this.images);




              // -----------------------
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
                
                // console.log('FIRST', this.imageAlbumFirst);
                // console.log('FINAL', this.imagesAlbum);

          })
  
    })
  }

  
//  ------------------------------
 details: any;
  seeDetails(image: any){
    this.details = image;
    this.imageDatail = 'http://localhost:3000/' + this.details.path;
  }

  // --------------------

  addImage(){
    console.log(this.id);
   this.router.navigate(['../add-image'], { queryParams: { id: this.id} });
  }
}
