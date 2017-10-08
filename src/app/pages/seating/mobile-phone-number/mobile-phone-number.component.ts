import { ICompleteReservationRequest } from '../../../@core/models/completeReservationRequest.model';
import { BodyOutputType, Toast, ToasterConfig, ToasterModule, ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

import { inherits } from 'util';
import { EmitterService } from '../../../emitter.service';
import { CheckIn, ICheckIn } from '../../../@core/models/checkIn.model';
import { CheckInService } from '../../../@core/data/checkin.service';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    ContentChild,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./mobile-phone-number.component.scss'],
  templateUrl: './mobile-phone-number.component.html',
})
export class MobilePhoneNumberSeatingComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChildren('input') vc;

   ngAfterViewInit() {
        this.vc.first.nativeElement.focus();
   }

   ngAfterViewChecked() {
   }

  public checkInForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(private _fb: FormBuilder,
              private checkInService: CheckInService,
              private toasterService: ToasterService) { };

  @Input() listId: string;
  @Input() completeReservationRequest = <ICompleteReservationRequest>{type: 'mobilePhone'};
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

  public complete() {
    this.buttonSubmitted = true;

      this.submitted = true; // set form submit to true

      // check if model is valids
      // if valid, call API to save customer
      let completeOperation: Observable<CheckIn>;

      // format model
      this.completeReservationRequest.idField = this.completeReservationRequest.idField.replace('+1', '')
        .replace('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace('.', '')	// (e.g. +17025551212) Modify the mobilePhoneNumber to be in the format that Twilio expects.

      completeOperation = this.checkInService.completeReservation(this.completeReservationRequest);

      // Subscribe to observable
      completeOperation.subscribe(
        (request) => {
          // Emit list event
          EmitterService.get(this.listId).emit(request);
          // Empty model
          this.completeReservationRequest = <ICompleteReservationRequest> {
              idField: null,
              type: null,
          };
          this.showToast('info', 'Reservation Completed Successfully', '');
          this.buttonSubmitted = false;
        },
        (err) => {
          // Log errors if any
          // console.log(err);
          this.buttonSubmitted = false;
          this.showToast('error', 'Reservation Complete Error', err.message);
        });
    }
}


