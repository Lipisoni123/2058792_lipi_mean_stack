import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { NgForm } from '@angular/forms';
import { CompileTemplateMetadata } from '@angular/compiler';
import { ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit {
  questions: any = [];
  answers: any = [];
  complete: boolean = false;
  exam: any;
  showQ: boolean = true;
  showRes: boolean = false;
  msg: string = "";
  correct: number = 0;
  score: number = 0;
  Results: string = "";
  scoreMsg: string = "";
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("assets/questions.json").subscribe(data => {
      this.questions = data;
    })
    this.httpClient.get("assets/answers.json").subscribe(data2 => {
      this.answers = data2;
    })
  }

  submit(examRef: NgForm) {
    this.exam = examRef.value;
    this.checkComplete();
    this.transition();
    if (this.complete == true) {
      this.gradeExam(examRef);
      this.scoreMsg = this.correct + ' / 10 Score: ' + this.score + "%";
    }

    examRef.reset;
  }

  checkComplete() {
    if (this.exam.q1 != "" && this.exam.q2 != "" && this.exam.q3 != "" && this.exam.q4 != "" && this.exam.q5 != "" &&
      this.exam.q6 != "" && this.exam.q7 != "" && this.exam.q8 != "" && this.exam.q9 != "" && this.exam.q10 != "") {
      this.complete = true;
    }
  }

  transition() {
    if (this.complete == true) {
      this.showRes = !this.showRes;
      this.showQ = !this.showQ;
    }
    else {
      this.msg = "The test is not complete!"
    }
  }
  gradeExam(examRef: NgForm) {
    if (this.exam.q1 == this.answers[0].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q1 Correct</h3>`;
    }
    else {
      this.Results = this.Results + `<h4 style="color:red">Q1 Incorrect</h4>`;
    }

    if (this.exam.q2 == this.answers[1].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q2 Correct</h3>`;
    }
    else {
      this.Results = this.Results + `<h4 style="color:red">Q2 Incorrect</h4>`;
    }

    if (this.exam.q3 == this.answers[2].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q3 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q3 Incorrect</h4>";
    }
    if (this.exam.q4 == this.answers[3].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q4 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q4 Incorrect</h4>";
    }
    if (this.exam.q5 == this.answers[4].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q5 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q5 Incorrect</h4>";
    }
    if (this.exam.q6 == this.answers[5].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q6 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q6 Incorrect</h4>";
    }
    if (this.exam.q7 == this.answers[6].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q7 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q7 Incorrect</h4>";
    }
    if (this.exam.q8 == this.answers[7].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q8 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q8 Incorrect</h4>";
    }
    if (this.exam.q9 == this.answers[8].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q9 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q9 Incorrect</h4>";
    }
    if (this.exam.q10 == this.answers[9].Correct) {
      this.correct++;
      this.Results = this.Results + `<h3 style="color:green">Q10 Correct</h3>`;
    }
    else {
      this.Results = this.Results + "<h4 style=\"color:red\">Q10 Incorrect</h4>";
    }
    this.score = (this.correct / 10) * 100;
  }
}
