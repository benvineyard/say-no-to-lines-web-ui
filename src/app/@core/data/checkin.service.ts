// tslint:disable:indent eofline
import { environment } from '../../../environments/environment';
import { ICompleteReservationRequest } from '../models/completeReservationRequest.model';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CheckIn, ICheckIn } from '../models/checkIn.model';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CheckInService {
	// Resolve HTTP using the constructor

	constructor(private http: Http) { }
	// private instance variable to hold base url
	private checkInSvcRemoteUrl = environment.checkInSvcRemoteUrl;

	// Fetch all existing checkins
	saveCheckIn(body: ICheckIn): Observable<CheckIn> {

		const bodyString = JSON.stringify(body); // Stringify payload
		const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		const options = new RequestOptions({ headers }); // Create a request option

		// ...using POST request
		return this.http.post(this.checkInSvcRemoteUrl, body, options)
			.map(this.extractData)
			.catch((error: any) => Observable.throw('saveCheckIn()::Server error | ' + error));
	}

	// Fetch all existing checkins
	completeReservation(body: ICompleteReservationRequest): Observable<CheckIn> {

		const bodyString = JSON.stringify(body); // Stringify payload
		const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		const options = new RequestOptions({ headers }); // Create a request option

		// ...using POST request
		return this.http.post(environment.completeSingleReservationSvcRemoteUrl, body, options)
			.map(this.extractData)
			.catch((error: any) => Observable.throw('saveCheckIn()::Server error | ' + error));
	}

	private extractData(res: Response) {
		return res.text() ? res.json() : {};
	}
};