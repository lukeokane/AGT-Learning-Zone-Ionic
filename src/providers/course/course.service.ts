import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from '../api/api';
import { Course} from '../../class/Course';


// import { SERVER_API_URL } from 'app/app.constants';
// import { createRequestOption } from 'app/shared';
// import { ICourse } from 'app/shared/model/course.model';

type EntityResponseType = HttpResponse<Course>;
type EntityArrayResponseType = HttpResponse<Course[]>;

@Injectable()
export class CourseService {
    public resourceUrl = Api.API_URL + 'api/courses';
    constructor(private http: HttpClient) {}

    create(course: Course): Observable<EntityResponseType> {
        return this.http.post<Course>(this.resourceUrl, course, { observe: 'response' });
    }

    update(course: Course): Observable<EntityResponseType> {
        return this.http.put<Course>(this.resourceUrl, course, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Course>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findAllCoursesList(req?: any): Observable<EntityArrayResponseType> {
        const options = null;
        return this.http.get<Course[]>(`${this.resourceUrl}/findAllCoursesList`, { params: options, observe: 'response' })
        .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = null;;
        return this.http.get<Course[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((course: Course) => {
                // notification.timestamp = notification.timestamp != null ? moment(notification.timestamp) : null;
            });
        }
        return res;
    }
}
