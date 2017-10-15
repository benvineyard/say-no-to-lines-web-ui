export interface IReservation {
	header: IBaseHeader;
	reservationUUID: string;
	// markedForNotification: boolean;
	mobilePhoneNumber?: string;
	guestRewardCardId?: string;
	partySize: number;
	createdAt: Date;
	completedAt: Date;
	actualWaitTimeMS: number;
	rollingAverageWaitTimeMS: number;
}

export interface IBaseHeader {
	originatorId: string;
	originatorHeader: any; // tslint:disable-line:no-any
	customerUUID: string;
	routingKey: string;
	eventDateTime: Date;
	tripId: string;
}