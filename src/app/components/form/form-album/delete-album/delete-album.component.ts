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
   
  }

      // ******************************************
  // MODALS
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


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
          console.log('Respuesta', albumDelete);
          this.modalService.dismissAll();
            if(albumDelete.ok){
              console.log('La respuesta',albumDelete.ok);
              swal("Good!", albumDelete.message, "success");
              this.modalService.dismissAll();
            }else{
              console.log('La respuesta',albumDelete.ok);
              swal("Error!", albumDelete.message, "error") ;
              this.modalService.dismissAll();
            }
     })
  }

  exit(){
    this.modalService.dismissAll();
  }

}
