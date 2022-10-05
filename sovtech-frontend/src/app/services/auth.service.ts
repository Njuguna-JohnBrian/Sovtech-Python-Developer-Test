import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthUser {
  data: {
    authenticate: {
      token: string
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string): Observable<string> {    
    return this.http.post<AuthUser>(`${environment.BASE_API}`, {
      'query': `
        mutation login($username: String!) {
          authenticate(username: $username) {
            token
          }
        }
      `,
      'variables': {username}
    })
    .pipe(map(x => x.data.authenticate.token));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
