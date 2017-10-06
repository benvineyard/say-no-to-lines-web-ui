// tslint:disable:indent eofline
export class CheckIn {
	constructor(
		public checkIn: ICheckIn,
	) { }
};

export interface ICheckIn {
	partySize: number;
	guestRewardCardId?: string;
	mobilePhoneNumber?: string;
}