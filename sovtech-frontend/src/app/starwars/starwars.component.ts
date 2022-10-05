import { Component, OnInit } from '@angular/core';
import { StarwarsService } from '../services/starwars.service';
import { Person, Results } from '../../models/people.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-starwars',
  templateUrl: './starwars.component.html',
  styleUrls: ['./starwars.component.scss'],
})
export class StarwarsComponent implements OnInit {
  people: [Person] | any;
  page?: number = 1;
  next?: number;
  previous?: number;
  count = 0;
  search = 'Luke';
  starWarForm: FormGroup;

  constructor(
    private starwarsService: StarwarsService,
    private formBuilder: FormBuilder,
    private router:Router,
    private authService:AuthService
  ) {
    this.starWarForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.authService.getToken() === null){
      this.router.navigate([''])
    }
    this.getPeople();

  }

  nextPage(): void {
    this.page = this.next;
    this.getPeople();
  }

  previousPage(): void {
    this.page = this.previous;
    this.getPeople();
  }

  resetPage(): void {
    this.page = 1;
    this.starWarForm.reset()
    this.getPeople();
  }
  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  getPeople() {
    this.starwarsService
      .getPeople(this.page, this.starWarForm.controls['search'].value)
      .subscribe({
        next: ({ results, count, next, previous }) => {
          this.people = results;
          this.count = count;
          this.next = next;
          this.previous = previous;
          console.log('people', this.people);
        },
        error: (error) => {},
      });
  }
}
