import { BrowserModule } from '@angular/platform-browser';
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
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit {

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

  config: ToasterConfig;

  position: string = 'toast-top-right';
  animationType: string = 'fade';
  title: string = 'HI there!';
  content: string = `I'm cool toaster!`;
  timeout: number = 5000;
  toastsLimit: number = 5;
  type: string = 'default';

  isNewestOnTop: boolean = true;
  isHideOnClick: boolean = true;
  isDuplicatesPrevented: boolean = false;
  isCloseButton: boolean = true;

  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  quotes = [
    { title: null, body: 'We rock at <i>Angular</i>' },
    { title: null, body: 'Titles are not always needed' },
    { title: null, body: 'Toastr rock!' },
    { title: 'What about nice html?', body: '<b>Sure you <em>can!</em></b>' },
  ];

  makeToast() {
    this.showToast(this.type, this.title, this.content);
  }

  openRandomToast () {
    const typeIndex = Math.floor(Math.random() * this.types.length);
    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    const type = this.types[typeIndex];
    const quote = this.quotes[quoteIndex];

    this.showToast(type, quote.title, quote.body);
  };

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  clearToasts() {
    this.toasterService.clear();
  }

  save(model: ICheckIn) {
    this.buttonSubmitted = true;

      this.submitted = true; // set form submit to true

      // check if model is valids
      // if valid, call API to save customer
      let checkInOperation: Observable<CheckIn>;

      // format model
      model.mobilePhoneNumber = model.mobilePhoneNumber.replace('+1', '')
        .replace('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace('.', '')	// (e.g. +17025551212) Modify the mobilePhoneNumber to be in the format that Twilio expects.

      checkInOperation = this.checkInService.saveCheckIn(model);
      // console.log('checkInOpertation', checkInOperation);
      // console.log(model, isValid);

      // Subscribe to observable
      checkInOperation.subscribe(
        (checkIn) => {
          // Emit list event
          EmitterService.get(this.listId).emit(checkIn);
          // Empty model
          model = <ICheckIn> {
              guestRewardCardId: null,
              mobilePhoneNumber: null,
              partySize: null,
          };
          // this.responseText = 'Success!';
          this.buttonSubmitted = false;
        },
        (err) => {
          // Log errors if any
          // console.log(err);
          this.buttonSubmitted = false;
          // this.errorText = err.message;
        });
    }
}


