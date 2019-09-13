import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { AlbumsService } from 'src/app/services/albums.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.scss']
})
export class CreateImageComponent implements OnInit {

  albums: any[] = [];
  id: string;
  public FormEntity: FormGroup;
  closeResult: string;
  imgPreview: string;
  @ViewChild("content", {static: true}) content: ElementRef;


  constructor(private imagesService: ImagesService,
              private router: Router,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private albumsService: AlbumsService,) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
          this.id = params['id'] || null;
        });
        this.imgPreview = 'assets/images/empty.jpg';
        this.loadData();
        this.open(this.content)
        this.initForm();
        
        // Disable the "back" button  -------------
        // window.location.hash="no-back-button";
        // window.location.hash="Again-No-back-button" //chrome
        // window.onhashchange=function(){window.location.hash="no-back-button";}
    }

 // Uploading albums from the database   --------------
    loadData(){
      // list albums
      this.albumsService.albumsList().subscribe(albums =>{
        this.albums = albums.albumBD;
      })
    }


  // Validating the form fields  -----------------
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



  // start and validation of the form  ------------
  private initForm() {
    this.FormEntity = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.maxLength(100)
      ]),
      album: new FormControl('', []),
      file: new FormControl('', []),
    });
  }


  // MODALS   ******************************
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  // Event of closing the modal window    -----------------
  private getDismissReason(reason: any): string {
    this.router.navigate(['/gallery'], { queryParams: { id: this.id} }); 
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }




// Select and display image   ****************
  logo = null;
  onInputImagelogoChange(event) {

      if(event.target.files && event.target.files[0]){
        this.logo = <File>event.target.files[0];

        var reader = new FileReader(); 

        reader.onload = (event:any) => { 
            let url = event.target.result;                
            this.imgPreview = `${url}`;
          } 

          reader.readAsDataURL(event.target.files[0]);

    }else{
        this.imgPreview = 'assets/images/empty.jpg';
    }
  }




// Validation and save image  ----------------
  saveImage(){
    if(this.FormEntity.valid){
      let date = moment().format("YYYY-MM-DD");
      const formData = new FormData();
        formData.append('name', this.FormEntity.value.name);
        formData.append('description', this.FormEntity.value.description);
        formData.append('album', this.FormEntity.value.album);
        formData.append('date', date);
        formData.append('file', this.logo);
      let params = {name: this.FormEntity.value.name, description: this.FormEntity.value.description, album: this.FormEntity.value.album, date};
      console.log('Resultado', params);
        this.ngOnInit();
        this.imagesService.imageCreate(formData).subscribe(imageSave =>{
          if(imageSave.ok){
            swal("Good!", imageSave.message, "success");
            this.modalService.dismissAll();
          }else{
            swal("Error!", imageSave.message, "error");
            this.modalService.dismissAll();
          }
        })
        this.FormEntity.reset();
      }else{
        this.markAsDirty(this.FormEntity);
      }
      this.modalService.dismissAll();
      this.router.navigate(['/gallery'], { queryParams: { id: this.id} }); 
      }
}


