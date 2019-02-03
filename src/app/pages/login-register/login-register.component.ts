import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignUpInfo } from '../../services/auth/signup-info';
import { AuthService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { PasswordValidation } from './password.validate';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  forma: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService
  ) { }

  ngOnInit() {
    this.forma = this.formBuilder.group({
      // validando campos del form
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      adress: [null, Validators.required],
      telephone: [null, Validators.required],
      city: [null, Validators.required],
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  get f() { return this.forma.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.forma.invalid) {
      // validación
      return;
    }

    let user = new SignUpInfo(
      this.forma.value.name,
      this.forma.value.username,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.adress,
      this.forma.value.city,
      this.forma.value.telephone,
    );

    this.authService.signUp(user).subscribe(
      (resp: any) => {
        // bien
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
        Toast.fire({
          type: 'success',
          title: `${resp.message}.`
        });
      },
      resp => {
        // error
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
        Toast.fire({
          type: 'error',
          title: `${resp.error.message}`,
          text: `${resp.error.errors.message}.`
        });
      }
    );

  }

}
