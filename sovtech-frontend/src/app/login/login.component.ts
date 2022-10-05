import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements  OnInit{
  isLoading: boolean = false;
  usernameForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.usernameForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }
  ngOnInit() {
    if(this.auth.getToken() != null){
      this.router.navigate(['/fetch'])
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (!this.usernameForm.valid) {
      this.isLoading = false;
      return this.usernameForm.markAllAsTouched();
    }
    this.isLoading = true;
    this.auth.login(this.usernameForm.get('username')?.value).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: token => {
        localStorage.setItem('token', token);
        this.router.navigate(['/fetch']);
      }
    });
  }
}
