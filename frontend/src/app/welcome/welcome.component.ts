import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubjectService } from '../service/subject.service';
import { CategoriesService } from '../service/categories.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;
  @ViewChild('subjectId') subjectIdKey!: ElementRef;
  @ViewChild('categoryId') categoryIdKey!: ElementRef;
  public subjectList: any = [];
  public categoryList: any = [];
  constructor(private subjectService: SubjectService, private categoriesService: CategoriesService) { 
    this.getAllSubjects();
    this.getAllCategories();
  }

  ngOnInit(): void { }

  startQuiz() {
    const name = this.nameKey.nativeElement.value;
    const shortName = name.replace(/\ς/, ''); //ελεγχος για το τελικό ς και αντικατάσταση με κενό
    localStorage.setItem('name', shortName);
    localStorage.setItem('subjectId', this.subjectIdKey.nativeElement.value);
    localStorage.setItem('categoryId', this.categoryIdKey.nativeElement.value);
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.subjectList = res.subjects;
      
    });
  }

  getSubjectsByCategory(categoryId: any) {
    
   this.subjectService.getSubjectsByCategory(categoryId).subscribe((res) => {
      this.subjectList = res.subjects;
    }); 
  }

  getAllCategories() {
    console.log("get All Categories");
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.categoryList = res.categories;
    });
  }
}
