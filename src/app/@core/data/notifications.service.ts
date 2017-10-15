// tslint:disable:indent eofline
import { IFinalizeReservationRequest } from '../models/finalizeReservationRequest.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IGuestInQueue } from '../models/guestsInQueue.model';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class QueuedGuestsService {
	// Resolve HTTP using the constructor

	constructor(private http: Http) { }
	// private instance variable to hold base url
	private getReservationQueueSvcRemoteUrl = environment.getReservationQueueSvcRemoteUrl;
	private finalizeReservationsSvcRemoteUrl = environment.finalizeReservationsSvcRemoteUrl;
	// Fetch all existing comments
	getGuestsInQueue(): Observable<IGuestInQueue[]> {

		const body = {
			body: {
				listName: environment.mgmBuffetGuestsListName,
				count: environment.mgmBuffetGuestsGetQueueCount,
			},
		};

		const bodyString = JSON.stringify(body); // Stringify payload
		const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		const options = new RequestOptions({ headers }); // Create a request option

		// ...using POST request
		return this.http.post(this.getReservationQueueSvcRemoteUrl, body, options)
			// ...and calling .json() on the response to return data
			.map(this.extractData)
			// ...errors if any
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}

	private extractData(res: Response) {
		return res.text() ? res.json() : {};
	}

	// Finalize reservations
	finalizeReservations(body: IFinalizeReservationRequest): Observable<IGuestInQueue[]> {
		const parsedBody = {
			listName: environment.mgmBuffetGuestsListName,
			reservations: body,
		};
		const bodyString = JSON.stringify(parsedBody); // Stringify payload
		const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		const options = new RequestOptions({ headers }); // Create a request option

		// ...using POST request
		return this.http.post(this.finalizeReservationsSvcRemoteUrl, parsedBody, options)
			// ...and calling .json() on the response to return data
			.map(this.extractData)
			// ...errors if any
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
};

export interface IGetGuestsInQueueBody {
	listName: string;
	count: number;
}