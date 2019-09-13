import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';
import swal from 'sweetalert';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.sass']
})
export class DeleteAlbumComponent implements OnInit {

  closeResult: string;
  id: string;

  @ViewChild("content", {static: true}) content: ElementRef;

  constructor(private albumsService: AlbumsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,) { }

  ngOnInit() {
    this.open(this.content)
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'] || null;
    });
           
    // Disable the "back" button  -------------
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
  }


  // MODALS
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


    // Event of closing the modal window    -----------------
  private getDismissReason(reason: any): string {
    this.router.navigate(['../']); 
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

// *********************************
  cofirmDelete(){
      this.albumsService.albumDelete(this.id).subscribe(albumDelete =>{
          this.modalService.dismissAll();
            if(albumDelete.ok){
              swal("Good!", albumDelete.message, "success");
              this.modalService.dismissAll();
            }else{
              swal("Error!", albumDelete.message, "error") ;
              this.modalService.dismissAll();
            }
     })
  }


  // -------------------
  exit(){
    this.modalService.dismissAll();
  }

}
