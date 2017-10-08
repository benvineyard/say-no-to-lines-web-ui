// tslint:disable:indent
function makeAppConfig() {
	const date = new Date();
	const year = date.getFullYear();

	// LOCAL
	// const AppConfig = {
	// 	productLink: 'http://SayNoToLines.com',
	// 	checkInSvcRemoteUrl: 'http://localhost:3000/v1/buffet/reservation',
	// 	completeSingleReservationSvcRemoteUrl: 'https://localhost:3000/v1/buffet/completesingle',
	// 	getReservationQueueSvcRemoteUrl: 'https://localhost:3000/v1/buffet/peek',
	// 	finalizeReservationsSvcRemoteUrl: 'https://localhost:3000/v1/buffet/complete',
	// 	mgmBuffetGuestsListName: `mgmBuffetGuests`,
	// 	mgmBuffetGuestsGetQueueCount: 10,
	// };

	// PRODUCTION
	const AppConfig = {
		productLink: 'http://SayNoToLines.com',
		checkInSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/reservation',
		completeSingleReservationSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/completesingle',
		getReservationQueueSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/peek',
		finalizeReservationsSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/complete',
		mgmBuffetGuestsListName: `mgmBuffetGuests`,
		mgmBuffetGuestsGetQueueCount: 10,
	};

	return AppConfig;
}

export const APPCONFIG = makeAppConfig();
