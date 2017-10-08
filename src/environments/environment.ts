/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// LOCAL
// export const environment = {
//   production: false,
//   productLink: 'http://SayNoToLines.com',
//   checkInSvcRemoteUrl: 'http://localhost:3000/v1/buffet/reservation',
//   completeSingleReservationSvcRemoteUrl: 'https://localhost:3000/v1/buffet/completesingle',
//   getReservationQueueSvcRemoteUrl: 'https://localhost:3000/v1/buffet/peek',
//   finalizeReservationsSvcRemoteUrl: 'https://localhost:3000/v1/buffet/complete',
//   mgmBuffetGuestsListName: `mgmBuffetGuests`,
//   mgmBuffetGuestsGetQueueCount: 10,
// };

// DEV
export const environment = {
  checkInSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/reservation',
  completeSingleReservationSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/completesingle',
  getReservationQueueSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/peek',
  finalizeReservationsSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/complete',
  mgmBuffetGuestsListName: `mgmBuffetGuests`,
  mgmBuffetGuestsGetQueueCount: 10,
}
