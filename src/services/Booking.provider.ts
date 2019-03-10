import { Booking } from './../class/Booking';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../providers/api/api';
import { createRequestOption } from './../providers/request-util';
import { LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';

type EntityArrayResponseType = HttpResponse<Booking[]>;

@Injectable()
export class BookingsService {
    private resource = Api.API_URL;
    private resourceUrl = Api.API_URL + '/bookings';

    constructor(private http: HttpClient, public loadingCtrl: LoadingController) { }

    create(booking: Booking): Observable<Booking> {
        return this.http.post(this.resourceUrl, booking);
    }

    update(booking: Booking): Observable<Booking> {
        return this.http.put(this.resourceUrl, booking);
    }

    find(id: number): Observable<Booking> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    updateBookingAcceptedTutorAssigned(booking: Booking,bookingId,adminId,tutorId): Observable<any> {
        return this.http.put(`${this.resourceUrl}/updateBookingAcceptedTutorAssigned`,{},{params:{bookingId:bookingId,adminId:adminId,tutorId:tutorId}});
    }
    findConfirmedBooking(): Observable<any> {
        return this.http.get(Api.API_URL + "/bookingsConfirmed");
    }
    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }

    saveBooking(booking: Booking): Booking {
        // let loading = this.loadingCtrl.create({
        //     content: 'Saving Booking...'
        // });
        // loading.present();
        this.update(booking).subscribe(data => {
            booking = data;
            // loading.dismiss();
            return booking;
        }, (error) => {
            // loading.dismiss();
            console.error(error);
        });
        return null;
    }

    getAllBookingsPageable(req?: any): Observable<HttpResponse<Booking[]>> {
        const options = createRequestOption(req);
        return this.http.get<Booking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Booking[]>) => this.convertArrayResponse(res));
    }

    updateBookingAcceptedByTutor(booking: Booking) {
        return this.http.put(`${this.resourceUrl}/updateBookingAcceptedByTutor`, booking);
    }

    updateBookingAssignedToTutor(booking: Booking) {
        return this.http.put(`${this.resourceUrl}/updateBookingAssignTutor`, booking);
    }

    updateBookingToCancelled(booking: Booking) {
        return this.http.put(`${this.resourceUrl}/updateBookingCancelledByTutor`, booking);
    }

    updateBookingRejectedByTutor(booking: Booking) {
        return this.http.put(`${this.resourceUrl}/updateBookingRejectedByTutor`, booking);
    }

    updateBookingRequestRejectedByAdmin(booking: Booking) {
        return this.http.put(`${this.resourceUrl}/updateBookingRequestRejectedByAdmin`, booking);
    }

    getBooking(id: number): Observable<Booking> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    getConfirmedBookings(): Observable<Booking> {
        return this.http.get(`${this.resource}/bookingsConfirmed`);
    }

    getAllBookingsDetails(): Observable<Booking> {
        return this.http.get(`${this.resource}/bookingsDetails`);
    }

    getBookingsLatestConfirmedChanges(startTimeMs: any) {
        return this.http.get(`${this.resource}/bookingsLatestConfirmedChanges?startTimeMs=${startTimeMs}`);
    }

    getBookingsLatestDetailsChanges(startTimeMs: any) {
        return this.http.get(`${this.resource}/bookingsLatestDetailsChanges?startTimeMs=${startTimeMs}`);
    }

    getBookingsPendingAdminApprovalChanges(startTimeMs: any) {
        return this.http.get(`${this.resource}/bookingsLatestPendingApprovalChanges?startTimeMs=${startTimeMs}`);
    }

    getBookingsLatestTutorChanges(startTimeMs: any, userId: number) {
        return this.http.get(`${this.resource}/bookingsLatestPendingApprovalChanges?startTimeMs=${startTimeMs}&userId=${userId}`);
    }

    getBookingsPendingAdminApproval() {
        return this.http.get(`${this.resource}/bookingsPendingApproval`);
    }

    getTutorBookings(userId: number) {
        return this.http.get(`${this.resource}/bookingsTutors?userId=${userId}`);
    }


    // finding all bookings by course all, year all within a date range and with BookingUserdetails
    findAllBookingsList(fromDate: string, toDate: string): Observable<EntityArrayResponseType> {
        const options = null;
        return this.http.get<Booking[]>(`${this.resourceUrl}/findAllBookingsList/${fromDate}/toDate/${toDate}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    // finding all bookings by course all, year all within a date range and no BookingUserdetails
    findAllBookingsDistributionList(fromDate: string, toDate: string): Observable<EntityArrayResponseType> {
        const options = null;
        return this.http.get<Booking[]>(`${this.resourceUrl}/findAllBookingsDistributionList/${fromDate}/toDate/${toDate}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    // finding all bookings by course all, a selected year, within a date range and BookingUserdetails populated
    findAllBookingsAllCoursesSelectedYear(fromDate: string, toDate: string, selectedYear: any): Observable<EntityArrayResponseType> {
        const options = null;
        return this.http.get<Booking[]>(`${this.resourceUrl}/findAllBookingsAllCoursesSelectedYear/${fromDate}/toDate/${toDate}/selectedYear/${selectedYear}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    // finding all bookings by a selected course, a selected year, within a date range and BookingUserdetails populated
    findAllBookingsSelectedCourseAndSelectedYear(fromDate: string, toDate: string, courseId: any, selectedYear: any): Observable<EntityArrayResponseType> {
        const options = null;
        return this.http.get<Booking[]>(`${this.resourceUrl}/findAllBookingsSelectedCourseAndSelectedYear/${fromDate}/toDate/${toDate}/selectedCourse/${courseId}/selectedYear/${selectedYear}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    // finding all bookings by a selected course, all years, within a date range and BookingUserdetails populated
    findAllBookingsSelectedCourseAndAllYears(fromDate: string, toDate: string, courseId: any): Observable<EntityArrayResponseType> {
        const options = null;
        return this.http.get<Booking[]>(`${this.resourceUrl}/findAllBookingsSelectedCourseAndAllYears/${fromDate}/toDate/${toDate}/selectedCourse/${courseId}`, { params: options, observe: 'response' })
        .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((subject: Booking) => {
            });
        }
        return res;
    }

    private convertArrayResponse(res: HttpResponse<Booking[]>): HttpResponse<Booking[]> {
        const jsonResponse: Booking[] = res.body;
        const body: Booking[] = [];
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
    private convertItemFromServer(object: Booking): Booking {
        const copy: Booking = Object.assign({}, object);
        return copy;
    }

}