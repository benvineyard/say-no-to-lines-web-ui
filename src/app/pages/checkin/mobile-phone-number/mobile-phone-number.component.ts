import { BodyOutputType, Toast, ToasterConfig, ToasterModule, ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

import { inherits } from 'util';
import { EmitterService } from '../../../emitter.service';
import { CheckIn, ICheckIn } from '../../../@core/models/checkIn.model';
import { CheckInService } from '../../../@core/data/checkin.service';
import { Component, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./mobile-phone-number.component.scss'],
  templateUrl: './mobile-phone-number.component.html',
})
export class MobilePhoneNumberComponent implements OnInit {

  public starRate: number = 2;
  public heartRate: number = 4;
  public checkInForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(private _fb: FormBuilder,
              private checkInService: CheckInService,
              private toasterService: ToasterService) { };

  @Input() listId: string;
  @Input() checkIn = <ICheckIn>{};
  @Output() buttonSubmitted: boolean = false;

  ngOnInit() {
    // we will initialize our form model here
    // the short way
    this.checkInForm = this._fb.group({
      partySize: ['', [<any>Validators.required]],
      mobilePhoneNumber: ['', [<any>Validators.required]],
    });
  }

  public config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'default',
      limit: 5,
  });

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

  public save() {
    this.buttonSubmitted = true;

      this.submitted = true; // set form submit to true

      // check if model is valids
      // if valid, call API to save customer
      let checkInOperation: Observable<CheckIn>;

      // format model
      this.checkIn.mobilePhoneNumber = this.checkIn.mobilePhoneNumber.replace('+1', '')
        .replace('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace('.', '')	// (e.g. +17025551212) Modify the mobilePhoneNumber to be in the format that Twilio expects.

      checkInOperation = this.checkInService.saveCheckIn(this.checkIn);

      // Subscribe to observable
      checkInOperation.subscribe(
        (checkIn) => {
          // Emit list event
          EmitterService.get(this.listId).emit(checkIn);
          // Empty model
          this.checkIn = <ICheckIn> {
              guestRewardCardId: null,
              mobilePhoneNumber: null,
              partySize: null,
          };
          this.showToast('info', 'Reservation Saved Successfully', '');
          this.buttonSubmitted = false;
        },
        (err) => {
          // Log errors if any
          // console.log(err);
          this.buttonSubmitted = false;
          this.showToast('error', 'Reservation Save Error', err.message);
        });
    }
}


