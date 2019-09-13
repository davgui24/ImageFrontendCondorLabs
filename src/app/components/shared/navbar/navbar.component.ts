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
  @Output() searchdate= new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

 
  // start and validation of the form  ------------
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



  // sending the form in an event for a parent component   ------------
  public search(){
    this.searchString.emit(JSON.stringify(this.FormEntity.value));
  }

  // sending the form in an event for a parent component   ------------
  public searchDate(){
    this.searchdate.emit(JSON.stringify(this.FormEntity.value));
  }
}
