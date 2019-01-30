import { Subject } from './../class/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';
import { createRequestOption } from './../providers/request-util';

@Injectable()
export class SubjectsService {
    private resourceUrl = Api.API_URL + '/subjects';

    constructor(private http: HttpClient) { }

    create(subject: Subject): Observable<Subject> {
        return this.http.post(this.resourceUrl, subject);
    }

    update(subject: Subject): Observable<Subject> {
        return this.http.put(this.resourceUrl, subject);
    }

    find(id: number): Observable<Subject> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

    query1(req?: any): Observable<HttpResponse<Subject[]>> {
        const options = createRequestOption(req);
        return this.http.get<Subject[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Subject[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Subject[]>): HttpResponse<Subject[]> {
        const jsonResponse: Subject[] = res.body;
        const body: Subject[] = [];
        if (jsonResponse != undefined && jsonResponse != null) {
            for (let i = 0; i < jsonResponse.length; i++) {
                body.push(this.convertItemFromServer(jsonResponse[i]));
            }
        }
        return res.clone({ body });
    }

    /**
* Convert a returned JSON object to Subject.
*/
    private convertItemFromServer(object: Subject): Subject {
        const copy: Subject = Object.assign({}, object);
        return copy;
    }




}