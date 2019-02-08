import { User } from './../class/User';
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

    getAllUsers(req?: any): Observable<HttpResponse<User[]>> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<User[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<User[]>): HttpResponse<User[]> {
        const jsonResponse: User[] = res.body;
        const body: User[] = [];
        if (jsonResponse != undefined && jsonResponse != null) {
            for (let i = 0; i < jsonResponse.length; i++) {
                body.push(this.convertItemFromServer(jsonResponse[i]));
            }
        }
        return res.clone({ body });
    }

    /**
* Convert a returned JSON object to User.
*/
    private convertItemFromServer(object: User): User {
        const copy: User = Object.assign({}, object);
        return copy;
    }


}