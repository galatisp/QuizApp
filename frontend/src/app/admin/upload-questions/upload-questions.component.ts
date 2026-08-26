
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubjectService } from '../../service/subject.service';
import { CategoriesService } from '../../service/categories.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-questions',
  templateUrl: './upload-questions.component.html',
  styleUrls: ['./upload-questions.component.scss']
})
export class UploadQuestionsComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;
  @ViewChild('subjectId') subjectIdKey!: ElementRef;
  @ViewChild('categoryId') categoryIdKey!: ElementRef;
  public subjectList: any = [];
  public categoryList: any = [];
  maxGrade: number = 0;
  noOfQuestions: number = 0;
  totalTime: number = 0;
  constructor(private subjectService: SubjectService, private categoriesService: CategoriesService) {

    this.noOfQuestions = environment.questions || 20; // Default to 20 if not set

    this.totalTime = environment.totalTime || 50;

    this.maxGrade = environment.maxGrade || 100;

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
