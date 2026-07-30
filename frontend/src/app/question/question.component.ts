import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { SubjectService } from '../service/subject.service';
import { CategoriesService } from '../service/categories.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public subjectId: string = '';
  public categoryId: number = 0;
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;

  answers: any[] = [];
  currentSubject: string = '';
  currentCategory: string = '';
  totalTime: number = 100;
  questionTime: number = 10;
  counter = 10;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;

  constructor(private questionService: QuestionService, private subjectService: SubjectService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
  
    this.initializeQuestions();
    this.startCounter();
   
  }

  initializeQuestions() {
    this.name = localStorage.getItem('name')!;
    this.subjectId = localStorage.getItem('subjectId')!;
    this.categoryId = Number(localStorage.getItem('categoryId')!);
    if (this.categoryId) {
      this.getCategory(this.categoryId);
     
      if (this.subjectId) {
        this.getSubject(this.subjectId);
        this.getSubjectRandomQuestions(this.subjectId);
      }
      else {
        this.getCategoryRandomQuestions(this.categoryId);
      }
      
    }
    else {
      if (this.subjectId) {
        this.getSubject(this.subjectId);
        this.getSubjectRandomQuestions(this.subjectId);
      }
      else {
        this.getRandomQuestions();

      }
    }
    this.currentQuestion = 0;
    this.setCurrentSubjectName();
  }

  getCategoryName(): string {
    const category = this.questionList[this.currentQuestion]?.categoryId;
    if (category) {
      this.categoriesService.getCategory(category).subscribe((res) => {
        this.currentCategory = res.categories[0].name;
      });
    }
    return this.currentCategory;
  }  

  setCurrentSubjectName() {
    const subject = this.questionList[this.currentQuestion]?.subjectId;
    if (subject) {
      this.subjectService.getSubject(subject).subscribe((res) => {
        this.currentSubject = res.subjects[0].name;
      });
    }
   
  }

  getCategory(id: any) {
    this.categoriesService.getCategory(id).subscribe((res) => {
      this.currentCategory = res.categories[0].name;
    });
  }

  getSubject(id: any) {
    this.subjectService.getSubject(id).subscribe((res) => {
      this.currentSubject = res.subjects[0].name;
    });
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  getRandomQuestions() {
    this.questionService.getRandomQuestions().subscribe((res) => {
      this.questionList = res.questions;
    });
  }
  getSubjectRandomQuestions(id: any) {
    this.questionService.getSubjectRandomQuestions(id).subscribe((res) => {
      this.questionList = res.questions;

    });
  }


  getCategoryRandomQuestions(id: any) {
    this.questionService.getCategoryRandomQuestions(id).subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    this.setCurrentSubjectName();
    this.resetCounter();
  }

  prevQuestion() {
    this.currentQuestion--;
    this.setCurrentSubjectName();
    this.resetCounter();
  }

  answer(currentQno: number, option: any) {
    // console.log('Current Question:', currentQno, 'Selected Option:', option);
    this.questionList[currentQno]["selectedOption"] = option;

    if (currentQno === this.questionList.length - 1) {
      this.isQuizCompleted = true;
      this.stopCounter();
      console.log('quiz completed');
    }
    if (option.correct) {
      this.points += 100/this.questionList.length;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.setCurrentSubjectName();
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    } else {
      setTimeout(() => {
        if (this.currentQuestion < this.questionList.length - 1) {
          this.currentQuestion++;
          this.setCurrentSubjectName();
        }


        this.resetCounter();
        this.incorrectAnswer++;
        this.getProgressPercent();
      }, 1000);
      // this.points -= 10;
    }
  }

  checkAnswer(option: any) {
    if (option.correct) {
      return 'correct';
    }
    return 'incorrect';
  }

  getCorrectAnswerText(question: any): string {
    const correctOption = question.options.find((option: any) => option.correct);
    return correctOption ? correctOption.text : '';
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = this.questionTime;
        // this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, this.totalTime * 1000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 10;
    this.startCounter();
  }

  resetQuiz() {
    console.log('Reset quiz. subjectId:', this.subjectId);
    this.initializeQuestions();

    // this.subjectId = localStorage.getItem('subjectId')!;
    // if (this.subjectId) {
    //   this.getSubject(this.subjectId);
    //   this.getSubjectRandomQuestions(this.subjectId);

    // } else {
    //   this.getRandomQuestions();

    // }

    this.resetCounter();
    this.points = 0;
    this.counter = 10;
    this.currentQuestion = 0;
    this.setCurrentSubjectName();
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100)
      .toFixed(0)
      .toString();

    return this.progress;
  }
}
