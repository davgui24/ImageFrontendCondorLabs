import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import swal from 'sweetalert';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumsService } from 'src/app/services/albums.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-image',
  templateUrl: './transfer-image.component.html',
  styleUrls: ['./transfer-image.component.sass']
})
export class TransferImageComponent implements OnInit {

  albums: any[] = [];
  id: string;
  idAlbum: string;
  newAlbum: any[] = [];
  public FormEntity: FormGroup;
  closeResult: string;
  @ViewChild("content", {static: true}) content: ElementRef;


  constructor(private imagesService: ImagesService,
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private albumsService: AlbumsService,) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let object= JSON.parse(params['id']) || null;
      this.id = object.id;
      this.idAlbum = object.idAlbum;
      console.log(this.id );
      console.log(this.idAlbum);
    });

    this.loadData();
    this.open(this.content)
    this.initForm();
  }


  // -----------------------
  loadData(){
    // list albums
    this.albumsService.albumsList().subscribe(albums =>{
      this.albums = albums.albumBD;
      // console.log('Estos son los albums', this.albums);

      this.albums.forEach(album => {
        if(album._id==this.idAlbum){

        }else{
         this.newAlbum.push(album);
        }
      });
    })
  }

  // -----------------------------

  public frmEntity(){
    return this.FormEntity.controls;
  }
  public markAsDirty(form: FormGroup) {
    let controlKeys = Object.keys(form.controls);
    controlKeys.forEach(key => {
      let control = form.controls[key];
      control.markAsDirty();
    });
  }

  private initForm() {
    this.FormEntity = new FormGroup({
      album: new FormControl('', []),
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
    this.router.navigate(['/list-images'], { queryParams: { id: this.id} }); 
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

// *********************************


saveImage(){
  if(this.FormEntity.valid){
    let data = {
                 albumFrom: this.idAlbum,
                  albumTo: this.FormEntity.value.album
                };

    this.imagesService.imageTransfer(this.id, data).subscribe(imageTranf =>{
      if(imageTranf.ok){
        swal("Good!", imageTranf.message, "success");
        this.router.navigate(['/list-images']); 
      }else{
        swal("Error!", imageTranf.message, "error");
        this.router.navigate(['/list-images']); 
      }
    })
    this.modalService.dismissAll();
  }else{
    this.markAsDirty(this.FormEntity);
  }
}

// -----------------------------------

exit(){
  this.modalService.dismissAll();
  }

}
