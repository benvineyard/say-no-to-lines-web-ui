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
export class GuestsQueueComponent implements OnInit {
    public guestsInQueue: IGuestInQueue[];

    constructor(private _fb: FormBuilder,
                private queuedGuestsService: QueuedGuestsService,
                private toasterService: ToasterService) { };

  ngOnInit() {
      this.loadGuestsInQueue();
  }

  source: LocalDataSource = new LocalDataSource();

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
    actions: {
        add: false,
    },
    add: false,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      mobilePhoneNumber: {
        title: 'Mobile Number',
        type: 'string',
      },
      partySize: {
        title: 'Party Size',
        type: 'number',
      },
      createdAt: {
        title: 'Created',
        type: 'date',
      },
      lastNotificationSent: {
        title: 'Last Sent',
        type: 'date',
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
                  const originalNumber = String(guest.mobilePhoneNumber).replace('+', '').replace('1', '');

                  // Will return formattedNumber.
                  // If phonenumber isn't longer than an area code, just show number
                  let formattedNumber = originalNumber;

                  // if the first character is '1', strip it out and add it back
                  const c = '';
                  // originalNumber = originalNumber[0] === '1' ? originalNumber.slice(1) : originalNumber;

                  // # (###) ###-#### as c (area) front-end
                  const area = originalNumber.substring(0, 3);
                  const front = originalNumber.substring(3, 6);
                  const end = originalNumber.substring(6, 10);

                  if (front) {
                      // tslint:disable-next-line:quotemark
                      formattedNumber = (c + "(" + area + ") " + front);
                  }
                  if (end) {
                      formattedNumber += ('-' + end);
                  }

                  guest.mobilePhoneNumber = formattedNumber;
                  guest.markedForNotification = false;
               }

               this.source.load(this.guestsInQueue);
            });
        } catch (error) {
            this.showToast('error', 'Guest Queue Retrieve Error', error.message);
        }
    }
}
