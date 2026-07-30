import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubject(id:any) {
    return this.http.get<any>('http://localhost:5000/public/subjects/'+id);
  }

  getAllSubjects() {
    return this.http.get<any>('http://localhost:5000/public/subjects');
  }

  getSubjectsByCategory(categoryId:any) {
    return this.http.get<any>('http://localhost:5000/public/subjects/category/'+categoryId);
  }

}
