import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isRegister = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleRegister() {
    this.isRegister = !this.isRegister;
  }
}
