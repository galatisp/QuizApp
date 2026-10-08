import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  getCategory(id:any) {
    return this.http.get<any>('/api/public/categories/'+id);
  }

  getAllCategories() {
    return this.http.get<any>('/api/public/categories');
  }

}
