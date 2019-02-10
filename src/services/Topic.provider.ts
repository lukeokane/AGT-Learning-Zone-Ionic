import { Topic } from './../class/Topic';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';
import { createRequestOption } from './../providers/request-util';
import { map } from 'rxjs/operators';

type EntityArrayResponseType = HttpResponse<Topic[]>;

@Injectable()
export class TopicService {
    private resourceUrl = Api.API_URL + '/topics';

    constructor(private http: HttpClient) { }

    create(Topic: Topic): Observable<Topic> {
        return this.http.post(this.resourceUrl, Topic);
    }

    update(Topic: Topic): Observable<Topic> {
        return this.http.put(this.resourceUrl, Topic);
    }

    find(id: number): Observable<Topic> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

    getAllTopicsBySubjectId(ids:any):Observable<any> {
        console.log("ids "+ids);
        // let params = new HttpParams();
        // payload.set('ids', ids);
        return this.http.get(`${this.resourceUrl}/bySubjectId`,{params:{ids:ids}});
    }
    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((Topic: Topic) => {
            });
        }
        return res;
    }
    /**
* Convert a returned JSON object to Topic.
*/
    private convertItemFromServer(object: Topic): Topic {
        const copy: Topic = Object.assign({}, object);
        return copy;
    }




}