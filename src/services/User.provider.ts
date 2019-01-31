import { User } from './../class/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';

@Injectable()
export class UserService {
    private resourceUrl = Api.API_URL + '/users';

    constructor(private http: HttpClient) { }

    create(user: User): Observable<User> {
        return this.http.post(this.resourceUrl, user);
    }

    update(user: User): Observable<User> {
        return this.http.put(this.resourceUrl, user);
    }

    find(id: number): Observable<User> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

   

}