import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { SignUpInfo } from '../../services/auth/signup.info';
import { AuthService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { PasswordValidation } from './password.validate';
import { AuthLoginInfo } from '../../services/auth/login.info';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  @ViewChild('user') userInput: ElementRef;
  @ViewChild('email') emailInput: ElementRef;
  forma: FormGroup;
  submitted = false;
  submitted2 = false;
  err: string;
  errorMessage = '';
  username: any;
  ipAddress: any;
  remember: boolean;
  roles: string[] = [];
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private http: HttpClient
  ) {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => this.ipAddress = data);
  }

  ngOnInit() {
    this.createFormControls();
  }

  get f() { return this.forma.controls; }

  createFormControls() {
    this.forma = this.formBuilder.group({
      // validando campos del form
      name: [null, Validators.required],
      identification: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      adress: [null, Validators.required],
      telephone: [null, [Validators.required, Validators.maxLength(17)]],
      city: [null, Validators.required],
    },
      {
        validator: PasswordValidation.MatchPassword // metodo de validacion
      });
  }

  // register
  onSubmit() {
    this.submitted = true;

    if (this.forma.invalid) {
      // validación
      return;
    }

    let user = new SignUpInfo(
      this.forma.value.name,
      this.forma.value.identification,
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
        this.clearForm();
      },
      resp => {
        // error
        this.err = resp.error.errors.message;
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
        Toast.fire({
          type: 'error',
          title: `${resp.error.message}`,
          text: `${this.err}.`
        });
        this.validFocus();
      }
    );

  }

  // login
  passIn(form: any) {
    this.submitted2 = true;
    // validacion
    if (form.invalid) {
      return;
    }

    let userAuth = new AuthLoginInfo(
      form.value.username,
      form.value.password,
      // TODO
      'Web - Windows - Google Chrome',
      this.ipAddress.ip
    );

    this.authService.attemptAuth(userAuth, form.remember)
      .subscribe(resp => {
        this.tokenStorage.saveToken(resp.data.accessToken);
        this.tokenStorage.saveRefreshToken(resp.data.refreshToken);
        this.tokenStorage.saveUsername(resp.data.username);
        this.tokenStorage.saveAuthorities(resp.data.role);
        // bien
        window.location.reload();
        // this.router.navigate(['']);
      },
        resp => {
          // error
          this.errorMessage = resp.error.errors.message;
          const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000
          });
          Toast.fire({
            type: 'error',
            title: `${resp.error.message}`,
            text: `${this.errorMessage}.`
          });

        }
      );
  }

  clearForm() {
    this.forma.reset();
    this.submitted = false;
  }

  validFocus() {
    if (this.err.search('nombre') === 3) {
      this.userInput.nativeElement.focus();
    } else {
      this.emailInput.nativeElement.focus();
    }

  }
}
