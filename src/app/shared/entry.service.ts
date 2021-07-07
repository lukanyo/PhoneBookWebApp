import { Injectable } from '@angular/core';
import { Entry } from './entry.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http:HttpClient) { }

  formData: Entry = new Entry(); 
  list: Entry[] = []; 
  readonly baseUrl =  'https://localhost:5001/Entries'; 

  postEntry(){
    return this.http.post(this.baseUrl, {'name': this.formData.name, 'phoneNumber':this.formData.phoneNumber}); 
  }

  refreshlist(){
    this.http.get(this.baseUrl)
    .toPromise()
    .then(res =>
      this.list = res as Entry[])
  }

  putEntry(){
    return this.http.put(`${this.baseUrl}/${this.formData.id}`, {'name': this.formData.name, 'phoneNumber':this.formData.phoneNumber}); 
  }

  deleteEntry(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
