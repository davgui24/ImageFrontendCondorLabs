import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import swal from 'sweetalert';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.sass']
})
export class DeleteImageComponent implements OnInit {

  closeResult: string;
  id: string;

  @ViewChild("content", {static: true}) content: ElementRef;

  constructor(private imageService: ImagesService,
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
    this.router.navigate(['list-images']); 
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  cofirmDelete(){
    this.imageService.imageDelete(this.id).subscribe(imageDelete =>{
        console.log('Respuesta', imageDelete);
        this.modalService.dismissAll();
          if(imageDelete.ok){
            console.log('La respuesta',imageDelete.ok);
            swal("Good!", imageDelete.message, "success");
            this.modalService.dismissAll();
          }else{
            console.log('La respuesta',imageDelete.ok);
            swal("Error!", imageDelete.message, "error") ;
            this.modalService.dismissAll();
          }
     })
  }

  exit(){
  this.modalService.dismissAll();
  }

}
