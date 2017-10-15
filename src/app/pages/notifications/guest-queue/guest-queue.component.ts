import { tryCatch } from 'rxjs/util/tryCatch';
import { IBaseHeader, IReservation } from '../../../@core/models/reservation.model';
import { environment } from '../../../../environments/environment.prod';
import { IFinalizeReservationRequest } from '../../../@core/models/finalizeReservationRequest.model';
import { LocalDataSource } from 'ng2-smart-table';
import { IGuestInQueue } from '../../../@core/models/guestsInQueue.model';
import { QueuedGuestsService } from '../../../@core/data/notifications.service';
import { BodyOutputType, Toast, ToasterConfig, ToasterModule, ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

import { inherits } from 'util';
import { EmitterService } from '../../../emitter.service';
import { Component, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as phoneFormatter from 'node-phone-formatter';
import * as moment from 'moment-timezone';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./guest-queue.component.scss'],
  templateUrl: './guest-queue.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class GuestsQueueComponent {
    public guestsInQueue: IGuestInQueue[];

    constructor(private _fb: FormBuilder,
                private queuedGuestsService: QueuedGuestsService,
                private toasterService: ToasterService) {
      this.source = new LocalDataSource();
      this.loadGuestsInQueue();
    };


  source: LocalDataSource;

  public config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'default',
      limit: 5,
  });

  public settings = {
    selectMode: 'multi',
    actions: {
        add: false,
    },
    edit: {
      editButtonContent: '<i class="fa fa-envelope"></"i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></"i>',
      confirmDelete: true,
    },
    columns: {
      mobilePhoneNumber: {
        title: 'Cell',
        type: 'text',
      },
      partySize: {
        title: 'Size',
        type: 'text',
      },
      createdAt: {
        title: 'Created',
        type: 'text',
      },
      lastNotificationSent: {
        title: 'Last',
        type: 'text',
      },
    },
  };

  private showToast(type: string, title: string, body: string) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  public loadGuestsInQueue() {
      try {
          this.queuedGuestsService.getGuestsInQueue()
          .subscribe((questsInQueue) => {
              this.guestsInQueue = questsInQueue;

              for (const guest of this.guestsInQueue) {
                  const normalizedNumber = phoneFormatter.normalize(guest.mobilePhoneNumber);
                  guest.mobilePhoneNumber = phoneFormatter.format(normalizedNumber, 'NNN-NNN-NNNN')
                  guest.markedForNotification = false;
                  guest.createdAt = guest.createdAt = moment().tz('America/Los_Angeles').format('M/d/YYYY h:m A');
               }

               this.source.load(this.guestsInQueue);
            });
        } catch (error) {
            this.showToast('error', 'Guest Queue Retrieve Error', error.message);
        }
    }

    public notify() {
      alert('foo');
    }
    public onDeleteConfirm(event: any) {}

    public onSaveConfirm(event: any): void {
      let request: IFinalizeReservationRequest = null
      if (window.confirm('Are you sure you want to save?')) {
        const count = 0;
        request = <IFinalizeReservationRequest>{
          listName: environment.mgmBuffetGuestsListName,
          reservations: <IReservation[]>[{}],
        }
        for (const guest of this.guestsInQueue) {
          if (guest.markedForNotification === true) {
              const reservation = <IReservation>{
                header: <IBaseHeader>{
                  originatorId: 'changme',
                },
                guestRewardCardId: guest.guestRewardCardId,
                mobilePhoneNumber: guest.mobilePhoneNumber,
                createdAt: guest.createdAt,
                partySize: Number(guest.partySize),
                completedAt: new Date(),
                reservationUUID: undefined,
              };
            request.reservations.push(reservation);
          }
        }

        if (request.reservations && request.reservations.length > 0) {
          try {
            this.queuedGuestsService.finalizeReservations(request)
            .subscribe((guests) => {

            });
          } catch (error) {
            this.showToast('error', 'Guest Queue Send Message Error', error.message);
          }
        }
      } else {
        event.confirm.reject();
      }
    }

    public rowSelect(event: any): void {

      if (event.data) {
        for (const reservation of this.guestsInQueue) {
          if (event.data && event.data.createdAt === reservation.createdAt
              && event.data.mobilePhoneNumber === reservation.mobilePhoneNumber
              && event.data.partySize === reservation.partySize) {
                event.data.markedForNotification = event.isSelected;

                break;
              }
        }
      } else {
        // This is a multi-select
        for (const reservation of this.guestsInQueue) {
          reservation.markedForNotification = !reservation.markedForNotification;
        }
      }
    }
}
