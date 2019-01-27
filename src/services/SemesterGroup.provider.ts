import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';
import { SemesterGroup } from '../class/SemesterGroup';
import { createRequestOption } from './../providers/request-util';

@Injectable()
export class SemesterGroupService {
    private resourceUrl = Api.API_URL + '/semester-groups';

    constructor(private http: HttpClient) { }

    create(semesterGroup: SemesterGroup): Observable<SemesterGroup> {
        return this.http.post(this.resourceUrl, semesterGroup);
    }


    update(semesterGroup: SemesterGroup): Observable<SemesterGroup> {
        return this.http.put(this.resourceUrl, semesterGroup);
    }

    find(id: number): Observable<SemesterGroup> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

    query1(req?: any): Observable<HttpResponse<SemesterGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<SemesterGroup[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SemesterGroup[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<SemesterGroup[]>): HttpResponse<SemesterGroup[]> {
        const jsonResponse: SemesterGroup[] = res.body;
        const body: SemesterGroup[] = [];
        if (jsonResponse != undefined && jsonResponse != null) {
            for (let i = 0; i < jsonResponse.length; i++) {
                body.push(this.convertItemFromServer(jsonResponse[i]));
            }
        }
        return res.clone({ body });
    }

    /**
* Convert a returned JSON object to SemesterGroup.
*/
    private convertItemFromServer(object: SemesterGroup): SemesterGroup {
        const copy: SemesterGroup = Object.assign({}, object);
        return copy;
    }

}