import { IReservation } from './reservation.model';
export interface IFinalizeReservationRequest {
    listName: string;
    reservations: IReservation[];
}
