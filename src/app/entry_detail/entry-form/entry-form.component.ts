import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Entry } from 'src/app/shared/entry.model';
import { EntryService } from 'src/app/shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [
  ]
})
export class EntryFormComponent implements OnInit {

  constructor(public service: EntryService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.id == ''){
      this.insertRecord(form); 
    }
    else{
      this.updateRecord(form); 
    }

  }

  insertRecord(form: NgForm){
    this.service.postEntry().subscribe(
      res => {
        this.resetForm(form); 
        this.service.refreshlist(); 
        this.toastr.success('Submitted Successfully', 'Phone book entry')
      },
      err => {
        console.log('Error'); 
      }
    );
  }

  updateRecord(form: NgForm){
    this.service.putEntry().subscribe(
      res => {
        this.resetForm(form); 
        this.service.refreshlist(); 
        this.toastr.info('Updated Successfully', 'Phone book entry')
      },
      err => {
        console.log('Error'); 
      }
    );
  }

  resetForm(form: NgForm){
    form.form.reset(); 
    this.service.formData= new Entry(); 
  }


  onSearch(name:string){
    console.log('name'); 
  }

}
