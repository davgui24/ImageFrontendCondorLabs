import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import { ImagesService } from 'src/app/services/images.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  albums: any;
  albumsBD: any[] = [];
  images: any;

  closeResult: string;
  @ViewChild("loadingtemplate", {static: true}) loadingtemplate: ElementRef;


  constructor(private albumsService: AlbumsService,
              private imagesService: ImagesService,
              private modalService: NgbModal,
              private router: Router) { }
              

  ngOnInit() {
   this.loadData();
  }

  // ----------------------------------------

  loadData(){
    // list albums
    this.albumsService.albumsList().subscribe(albums =>{
      this.albums = albums;
      this.albumsBD = albums.albumBD;
      // console.log('Estos son los albums', this.albumsBD);
    })

    // -----------------------

    // list images
    this.imagesService.imageList().subscribe(images =>{
      this.images = images;
      // console.log('Estos son las images', this.images);
    })
  }

  // ----------------------------

  openModal() {
    this.router.navigate(['home/form-album']); 
  }

  goGallery(albumID: string){
    console.log(albumID);
    this.router.navigate(['/gallery'], { queryParams: { id: albumID} }); 
  }


  // ********************************************
// MODAL

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

// ********************************************


albumselect: string;
  deleteAlbum(album){
    if(album.images.length > 0){
      swal("Error!", 'There are images associated with this album', "error");
    }else{
      this.router.navigate(['/home/delete-album/'], { queryParams: { id: album._id} }); 
    }
  }

  // -------------------------
  searchString: string = '';
  searchWord(event){
    this.searchString = event;
    if(this.searchString && this.searchString.trim() != ''){
      this.albumsBD = this.albumsBD.filter((item =>{
        return (item.name.toLowerCase().indexOf(event.toLowerCase()) > -1);
      }))
    }else{
      this.albumsBD = this.albums.albumBD;
    }
  }

}
