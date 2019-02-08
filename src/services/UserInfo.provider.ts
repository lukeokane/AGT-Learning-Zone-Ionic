import { UserInfo } from './../class/UserInfo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';
import { createRequestOption } from './../providers/request-util';

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

    getAllUserInfos( req?: any): Observable<HttpResponse<UserInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserInfo[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<UserInfo[]>): HttpResponse<UserInfo[]> {
        const jsonResponse: UserInfo[] = res.body;
        const body: UserInfo[] = [];
        if (jsonResponse != undefined && jsonResponse != null) {
            for (let i = 0; i < jsonResponse.length; i++) {
                body.push(this.convertItemFromServer(jsonResponse[i]));
            }
        }
        return res.clone({ body });
    }

    /**
* Convert a returned JSON object to UserInfo.
*/
    private convertItemFromServer(object: UserInfo): UserInfo {
        const copy: UserInfo = Object.assign({}, object);
        return copy;
    }


}