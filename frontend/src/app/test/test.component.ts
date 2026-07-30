import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public name: string = '';
  public questionList: any = [];
  public subjectList: any = [];
  public currentQuestion: number = 0;
  public currentSubject: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;

  constructor(private questionService: QuestionService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    //this.getAllQuestions();
    this.getSubject(2);
    this.getSubjectRandomQuestions(2);
    this.startCounter();
  }


  getColorOf(subjectId: number) {
   
    if (subjectId ==1 ) {
      return 'lightsalmon';
    } else if (subjectId == 2) {
      return 'lightcyan';
    } else if (subjectId == 3) {
      return 'lavender';
    } else if (subjectId == 4) {
      return 'khaki';
    } else if (subjectId == 5) {
      return 'lime';
    } else if (subjectId == 6) {
      return 'pink';
    } else if (subjectId == 7) {
      return 'orange';
    } else if (subjectId == 8) {
      return 'yellow';
    } else if (subjectId == 9) {
      return 'blue';
    } else if (subjectId == 10) {
      return 'green';
    } 
    else {
      return 'high'
    }
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }
  getSubject(id:any) {
    this.subjectService.getSubject(id).subscribe((res) => {
      this.subjectList = res.subjects;
      
    });
  }

   getSubjectQuestions(id:any) {
    this.questionService.getSubjectQuestions(id).subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  getSubjectRandomQuestions(id:any) {
    this.questionService.getSubjectRandomQuestions(id).subscribe((res) => {
      this.questionList = res.questions;
      console.log(this.questionList);

    });
  }

  answer(currentQno: number, option: any) {
    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.incorrectAnswer++;
        this.getProgressPercent();
      }, 1000);
      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100)
      .toFixed(0)
      .toString();

    return this.progress;
  }
}
