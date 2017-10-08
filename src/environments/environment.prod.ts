/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  productLink: 'http://SayNoToLines.com',
  checkInSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/reservation',
  completeSingleReservationSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/completesingle',
  getReservationQueueSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/peek',
  finalizeReservationsSvcRemoteUrl: 'https://botvana-api-reservation.herokuapp.com/v1/buffet/complete',
  mgmBuffetGuestsListName: `mgmBuffetGuests`,
  mgmBuffetGuestsGetQueueCount: 10,
};
