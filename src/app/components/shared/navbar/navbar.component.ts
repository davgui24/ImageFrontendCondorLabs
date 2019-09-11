import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public FormEntity: FormGroup;
  @Output() searchString = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.initForm();

    // let search = document.querySelector("search");
    // window.document.addEventListener("keydown", function (event) {
    //   console.log(event.key);

    //  })
  }

  // ---------------------------------------


  private initForm() {
    this.FormEntity = new FormGroup({
      search: new FormControl('', [
            // Validators.required,
            // Validators.minLength(3),
            // Validators.maxLength(100)
        ]),
        date: new FormControl('', [
      ]),
    })
  }



  // ----------------------------------

  public search(){
    this.searchString.emit(this.FormEntity.value.search);
  }
}
