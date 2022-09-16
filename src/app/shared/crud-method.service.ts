import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CrudMethodService {

  constructor(private http: HttpClient) { }

  postDetails(data:any){
    return this.http.post<any>("http://localhost:3000/posts/",data)
  }

  getDetails(){
    return this.http.get<any>("http://localhost:3000/posts/")
  }

  deleteDetails(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
  }

  updateDetails(id:number, data:any){
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
  }
}
