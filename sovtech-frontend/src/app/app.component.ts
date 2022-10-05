import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;
  usernameForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.usernameForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = false;
    if (!this.usernameForm.valid) {
      this.isLoading = false;
      return this.usernameForm.markAllAsTouched();
    }
    this.isLoading = false;
    this.router.navigate(['fetch']);
  }
}
