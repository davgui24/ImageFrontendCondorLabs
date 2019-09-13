import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

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

    // Disable the "back" button  -------------
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
  }


// Uploading images from the database   --------------
  loadData(){
    this.imagesService.imageList().subscribe(images =>{
      this.imagesBD = images.image;
      this.images = images;
    })
  }



  deleteImage(image){
    this.router.navigate(['delete-image/'], { queryParams: { id: image._id} }); 
  }

 

  transferImage(image){
    // console.log(image.album._id);
    this.router.navigate(['transfer-image/'], { queryParams: {id: JSON.stringify({ id: image._id, idAlbum: image.album._id })} }); 
  }




  // search by word   -------------
  searchString: string = '';
  search(event){

    this.searchString = JSON.parse(event).search;
    console.log(this.searchString);

    if(this.searchString && this.searchString.trim() != ''){
      this.imagesBD = this.imagesBD.filter((item =>{
        return (item.name.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1);
      }))
    }else{
      this.imagesBD = this.images.image;
    }
  }

  // search by date   -------------
    searchDate: any;
    searchdate(event){
        this.searchDate = JSON.parse(event).date;
        let date = moment(this.searchDate.year + '-' + this.searchDate.month + '-' + this.searchDate.day).format('YYYY MMMM dddd');
        if(date && date.trim() != ''){
          this.imagesBD = this.imagesBD.filter((item =>{
          return (moment(item.date).format('YYYY MMMM dddd').toLowerCase().indexOf(date.toLowerCase()) > -1);
      }));
      }else{
        this.imagesBD = this.images.image;
      }
    }
  

}
