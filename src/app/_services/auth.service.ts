import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, ApiResponse, LoginResponse, LoginPayload } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    apiUrl = 'https://jibrila.herokuapp.com/api'; // environment.PEACE_API;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(loginPayload: LoginPayload) {
        console.log('\ninside Auth service', loginPayload);
        return this.http.post<LoginResponse>(`${this.apiUrl}/staff/login`, loginPayload)
            .pipe(map(response => {
                console.log(response);
                if (response.success) {
                    localStorage.setItem('currentUser', JSON.stringify(response.payload.user));
                    localStorage.setItem('token', JSON.stringify(response.payload.token));
                    this.currentUserSubject.next(response.payload.user);
                }
                return response;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
