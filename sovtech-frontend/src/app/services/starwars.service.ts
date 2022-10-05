import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { People, Results } from '../../models/people.model';
import { AuthService } from './auth.service';

interface GetPeople {
  data: {
    getPeople: People;
  }
}

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /**
   * @returns : An Array of Object of type `Results`
   */
  getPeople(page?: number, search?: string): Observable<People> {
    return this.http.post<GetPeople>(`${environment.BASE_API}`, {
      'query': `
        query fetchPeople($page: Int!, $search: String) {
          getPeople(page: $page, search: $search) {
            count
            next
            previous
            results {
              name
              gender
              homeworld
              height
              mass
            }
          }
        }
      `,
      'variables': {
        'page': page,
        'search': search
      }
    }, 
    {
      headers: {
        'Authorization': `Bearer ${this.auth.getToken()}`
      }
    })
    .pipe(map(x => x.data.getPeople));
  }
}
