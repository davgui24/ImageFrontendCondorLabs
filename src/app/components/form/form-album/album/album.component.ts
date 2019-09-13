import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlbumsService } from 'src/app/services/albums.service';
import swal from 'sweetalert';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {

  albums: any[] = [];
  public FormEntity: FormGroup;

  closeResult: string;

  @ViewChild("content", {static: true}) content: ElementRef;

  constructor(private albumsService: AlbumsService,
              private router: Router,
              private modalService: NgbModal,) { }

  ngOnInit() {
    this.open(this.content)
    this.initForm();

    // Disable the "back" button  -------------
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
  }


 // Uploading albums from the database   --------------
  loadData(){
    this.albumsService.albumsList().subscribe(albums =>{
      this.albums = albums;
      console.log('Estos son los albums', this.albums);
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
    this.router.navigate(['../']); 
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



// Validation and save album  ----------------
  saveAlbum(){
    if(this.FormEntity.valid){
      let date = moment().format("YYYY-MM-DD");
      let params = {name: this.FormEntity.value.name, description: this.FormEntity.value.description, date};
      this.ngOnInit();
      this.albumsService.albumCreate(params).subscribe(albumSave =>{
        console.log('Album guardado', albumSave);
        if(albumSave.ok){
          swal("Good!", albumSave.message, "success");
          this.modalService.dismissAll();
        }else{
          swal("Error!", albumSave.message, "error");
          this.modalService.dismissAll();
        }
      })
      this.FormEntity.reset();
    }else{
      this.markAsDirty(this.FormEntity);
    }
  }



}
