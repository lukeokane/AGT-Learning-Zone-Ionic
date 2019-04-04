import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';

type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable()
export class CalendarService {
    private resourceUrl = Api.API_URL + '/academicCalendarConfiguration';

    constructor(private http: HttpClient) { }

    edit(date: String): Observable<any> {
        return this.http.put(`${this.resourceUrl}/editStartDate/${date}`,date);
    }

    get(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/getStartDate`);
    }




}