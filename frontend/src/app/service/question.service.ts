import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

 


@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  
  private limit: number;

  constructor(private http: HttpClient) {
    this.limit = environment.questions || 20; // Default to 20 if not set
  }

  

  getQuestionJson() {
    return this.http.get<any>('http://localhost:5000/public/questions');
  }

  getRandomQuestions() {
    return this.http.get<any>('http://localhost:5000/public/questions/random/' + this.limit);
  }

  getSubjectQuestions(id:any) {
    return this.http.get<any>('http://localhost:5000/public/questions/subject/'+id);
  }



  getSubjectRandomQuestions(id:any) {
    return this.http.get<any>('http://localhost:5000/public/questions/random/subject/'+id+'/'+this.limit);
  }

   getCategoryRandomQuestions(id:any) {
    return this.http.get<any>('http://localhost:5000/public/questions/random/category/'+id+'/'+this.limit);
  }
}
