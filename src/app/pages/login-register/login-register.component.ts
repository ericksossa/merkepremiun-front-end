import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  forma: FormGroup;
  constructor() { }

  ngOnInit() {

    this.forma = new FormGroup({
      // validando campos del form
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      telephone: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),

    });
  }

  toRegister() { }

}
