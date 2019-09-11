import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit {
  
  images;
  imagesBD: any[] = [];

  constructor(private imagesService: ImagesService,
               private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  // -----------------------
  loadData(){
    this.imagesService.imageList().subscribe(images =>{
      this.imagesBD = images.image;
      this.images = images;
      // console.log(this.images);
    })
  }

  // ------------------------

  deleteImage(image){
    this.router.navigate(['delete-image/'], { queryParams: { id: image._id} }); 
  }

  // ----------------------

  transferImage(image){
    // console.log(image.album._id);
    this.router.navigate(['transfer-image/'], { queryParams: {id: JSON.stringify({ id: image._id, idAlbum: image.album._id })} }); 
  }


    // -------------------------
    searchString: string = '';
    searchWord(event){
      this.searchString = event;  
      if(this.searchString && this.searchString.trim() != ''){
        this.imagesBD = this.imagesBD.filter((item =>{
          return (item.name.toLowerCase().indexOf(event.toLowerCase()) > -1);
        }))
      }else{
        this.imagesBD = this.images.image;
      }
    }
  

}
