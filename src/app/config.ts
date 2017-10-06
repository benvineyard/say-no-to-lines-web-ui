// tslint:disable:indent
function makeAppConfig() {
	const date = new Date();
	const year = date.getFullYear();

	const AppConfig = {
		brand: 'Say No To Lines',
		user: 'amber',
		year,
		layoutBoxed: false,               // true, false
		navCollapsed: false,              // true, false
		navBehind: false,                 // true, false
		fixedHeader: true,                // true, false
		sidebarWidth: 'middle',           // small, middle, large
		theme: 'light',                   // light, gray, dark
		colorOption: '34',                // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
		AutoCloseMobileNav: true,         // true, false. Automatically close sidenav on route change (Mobile only)
		productLink: 'http://SayNoToLines.com',
		checkInSvcRemoteUrl: 'https://reservation.saynotolines.com/v1/buffet/reservation',
		getReservationQueueSvcRemoteUrl: 'https://reservation.saynotolines.com/v1/buffet/peek',
		finalizeReservationsSvcRemoteUrl: 'https://reservation.saynotolines.com/v1/buffet/complete',
		mgmBuffetGuestsListName: `mgmBuffetGuests`,
		mgmBuffetGuestsGetQueueCount: 10
	};

	return AppConfig;
}

export const APPCONFIG = makeAppConfig();
