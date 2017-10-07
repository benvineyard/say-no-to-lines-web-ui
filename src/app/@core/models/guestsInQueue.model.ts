// tslint:disable:indent eofline
export class GuestInQueue {
	constructor(
		public guestInQueue: IGuestInQueue,
	) { }
};

export interface IGuestInQueue {
	markedForNotification: Boolean;
	partySize: string;
	guestRewardCardId?: string;
	mobilePhoneNumber?: string;
	createdAt: Date;
}