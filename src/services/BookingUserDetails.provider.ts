import { BookingUserDetails } from './../class/BookingUserDetails';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';

@Injectable()
export class BookingUserDetailService {
    private resourceUrl = Api.API_URL + '/booking-user-details';

    constructor(private http: HttpClient) { }

    create(bookingUserDetails: BookingUserDetails): Observable<BookingUserDetails> {
        return this.http.post(this.resourceUrl, bookingUserDetails);
    }

    update(bookingUserDetails: BookingUserDetails): Observable<BookingUserDetails> {
        return this.http.put(this.resourceUrl, bookingUserDetails);
    }

    find(id: number): Observable<BookingUserDetails> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

    updateBookingUserDetailsForCheckIn(bookingID:number,login:string,bookingUserDetails:BookingUserDetails)
    {
        return this.http.put(`${this.resourceUrl}/checkIn/${bookingID}/${login}`,bookingUserDetails);
    }

}