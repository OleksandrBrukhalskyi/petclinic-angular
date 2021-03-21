import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user.model';
import { Auth } from '../model/auth.model';


@Injectable({
    providedIn: 'root'
  })

export class AuthService{

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        let localUser = JSON.parse(localStorage.getItem('user'));
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();

    }

      public get userValue(): User {
        return this.userSubject.value;
        }

    register(user: User){
        return this.http.post<any>(`http://localhost:8080/api/register`, user)
            .pipe(map<Auth, User>(auth => {
                if(auth.errors && auth.errors.length > 0){
                    throw auth.errors.join('\n');
                }
                return auth.user;
            }));

    }
    login(login: string, password: string){
        return this.http.post<any>(`http://localhost:8080/api/auth`, {login, password})
        .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
            }

            return user;
        }));
    }
    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      }
}
