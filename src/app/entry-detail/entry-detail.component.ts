import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styles: [
  ]
})
export class EntryDetailComponent implements OnInit {

  constructor(public service: EntryService,
      private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.service.refreshlist(); 
  }

  populateForm(selectedRecord:Entry){
    this.service.formData = Object.assign({},selectedRecord); 
  }

  onDelete(id:string){
    if(confirm('Are you sure you want to delete this entry?'))
    {
      this.service.deleteEntry(id)
      .subscribe(
        res=>{
          this.service.refreshlist(); 
          this.toastr.info("Deleted Sucessfully", "Phone Book Entry")
        },
        err=>{
          console.log(err); 
        }
      )
    }

  }

}
