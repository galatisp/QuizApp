import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubject(id:any) {
    return this.http.get<any>('/api/public/subjects/'+id);
  }

  getAllSubjects() {
    return this.http.get<any>('/api/public/subjects');
  }

  getSubjectsByCategory(categoryId:any) {
    return this.http.get<any>('/api/public/subjects/category/'+categoryId);
  }

}
