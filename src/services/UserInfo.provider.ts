import { UserInfo } from './../class/UserInfo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';

@Injectable()
export class UserInfoService {
    private resourceUrl = Api.API_URL + '/user-infos';

    constructor(private http: HttpClient) { }

    create(user: UserInfo): Observable<UserInfo> {
        return this.http.post(this.resourceUrl, user);
    }

    update(user: UserInfo): Observable<UserInfo> {
        return this.http.put(this.resourceUrl, user);
    }

    find(id: number): Observable<UserInfo> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

   

}