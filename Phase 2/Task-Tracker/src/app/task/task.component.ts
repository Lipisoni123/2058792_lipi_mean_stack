import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class taskComponent implements OnInit {

  Taskdata: any;


  detail = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    task: new FormControl("", [Validators.required]),
    dl: new FormControl("", [Validators.required])
  })


  constructor() { }

  ngOnInit(): void {
  }


  storedetail() {
    if (localStorage.getItem("list") == undefined) {
      this.Taskdata = [];
      localStorage.setItem("list", JSON.stringify(this.Taskdata));
      this.Taskdata = "";
    }

    let detail = this.detail.value;
    console.log(detail);
    this.Taskdata = "";
    this.Taskdata = JSON.parse(localStorage.getItem("list")!);
    this.Taskdata.push({
      "id": detail.id,
      "name": detail.name,
      "task": detail.task,
      "dl": detail.dl
    })

    localStorage.setItem("list", JSON.stringify(this.Taskdata));
    this.detail.reset();
  }
}
