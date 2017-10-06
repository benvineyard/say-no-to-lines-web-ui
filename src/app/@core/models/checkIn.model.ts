// tslint:disable:indent eofline
export class CheckIn {
	constructor(
		public checkIn: ICheckIn,
	) { }
};

export interface ICheckIn {
	partySize: string;
	guestRewardCardId?: string;
	mobilePhoneNumber?: string;
}