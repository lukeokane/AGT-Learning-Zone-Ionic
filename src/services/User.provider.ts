import { User } from './../class/User';
import { Booking } from './../class/Booking';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';
import { createRequestOption } from './../providers/request-util';

@Injectable()
export class UserService {
    private resourceUrl = Api.API_URL + '/users';

    constructor(private http: HttpClient) { }

    create(user: User): Observable<User> {
        return this.http.post(this.resourceUrl, user);
    }

    update(user: User): Observable<Booking> {
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