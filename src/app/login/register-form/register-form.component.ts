import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Input() isRegister;
  @Output() closeRegister: EventEmitter<any> = new EventEmitter();

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleRegister() {
    this.closeRegister.emit();
  }
}
