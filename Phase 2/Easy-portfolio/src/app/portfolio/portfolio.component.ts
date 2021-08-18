import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  //MISC STRINGS
  user: string = "";
  msg: string = ""

  //FLAGS
  loginFlag: boolean = true;
  signUpFlag: boolean = false;
  portfolioFlag: boolean = false;

  //ARRAYS
  userData: any;
  contactData: any;

  //REFS
  loginRef = new FormGroup({
    username: new FormControl("", [Validators.required]),
    pass: new FormControl("", [Validators.required])
  });

  regRef = new FormGroup({
    fname: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    pass: new FormControl("", [Validators.required])
  })

  contactRef = new FormGroup({
    name: new FormControl("", [Validators.required]),
    pNum: new FormControl("", [Validators.required])
  })


  constructor() { }

  ngOnInit(): void {
  }

  checkUser() {
    if (localStorage.getItem("users") == undefined) {
      this.userData = [];
      localStorage.setItem("users", JSON.stringify(this.userData));
      this.userData = ""
    }

    let user = this.loginRef.value;
    console.log(user);
    this.userData = "";
    this.userData = JSON.parse(localStorage.getItem("users")!);
    for (var i = 0; i < this.userData.length; i++) {
      if (this.userData[i].username == user.username && this.userData[i].pass == user.pass) {
        this.user = this.userData[i].username;
        this.loginFlag = false;
        this.portfolioFlag = true;
      }
    }
    this.msg = "Login Failed. Please check your credentials or sign up for an account."
    this.loginRef.reset();
  }

  saveUser() {
    if (localStorage.getItem("users") == undefined) {
      this.userData = [];
      localStorage.setItem("users", JSON.stringify(this.userData));
      this.userData = ""
    }
    let newUser = this.regRef.value;
    console.log(newUser);
    this.userData = "";
    this.userData = JSON.parse(localStorage.getItem("users")!)
    this.userData.push({
      "fname": newUser.fname,
      "lname": newUser.laname,
      "username": newUser.username,
      "pass": newUser.pass
    })
    localStorage.setItem("users", JSON.stringify(this.userData));
    this.signUpFlag = false;
    this.loginFlag = true;
  }

  saveContact() {
    this.msg = "";
    if (localStorage.getItem("contacts") == undefined) {
      this.contactData = [];
      localStorage.setItem("contacts", JSON.stringify(this.contactData));
      this.contactData = "";
    }
    let contact = this.contactRef.value;
    console.log(contact);
    this.contactData = "";
    this.contactData = JSON.parse(localStorage.getItem("contacts")!);
    this.contactData.push({
      "name": contact.name,
      "pNum": contact.pNum
    })

    localStorage.setItem("contacts", JSON.stringify(this.contactData));
    this.contactRef.reset();
  }
}