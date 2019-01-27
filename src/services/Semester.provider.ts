import { createRequestOption } from './../providers/request-util';
import { Semester } from './../class/Semester';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';

@Injectable()
export class SemesterService {
    private resourceUrl = Api.API_URL + '/semesters';

    constructor(private http: HttpClient) { }

    create(semester: Semester): Observable<Semester> {
        return this.http.post(this.resourceUrl, semester);
    }

    update(semester: Semester): Observable<Semester> {
        return this.http.put(this.resourceUrl, semester);
    }

    find(id: number): Observable<Semester> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }


    query1( req?: any): Observable<HttpResponse<Semester[]>> {
        const options = createRequestOption(req);
        return this.http.get<Semester[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Semester[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Semester[]>): HttpResponse<Semester[]> {
        const jsonResponse: Semester[] = res.body;
        const body: Semester[] = [];
        if (jsonResponse != undefined && jsonResponse != null) {
            for (let i = 0; i < jsonResponse.length; i++) {
                body.push(this.convertItemFromServer(jsonResponse[i]));
            }
        }
        return res.clone({ body });
    }

    /**
* Convert a returned JSON object to Semester.
*/
    private convertItemFromServer(object: Semester): Semester {
        const copy: Semester = Object.assign({}, object);
        return copy;
    }



}