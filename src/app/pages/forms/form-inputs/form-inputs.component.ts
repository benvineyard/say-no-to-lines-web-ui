import { EmitterService } from '../../../emitter.service';
import { CheckIn, ICheckIn } from '../../../@core/models/checkIn.model';
import { CheckInService } from '../../../@core/data/checkin.service';
import { Component, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {

  public starRate: number = 2;
  public heartRate: number = 4;
  // public checkInForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  // constructor(private _fb: FormBuilder, private checkInService: CheckInService) { };
  constructor(private checkInService: CheckInService) { };

  @Input() listId: string;
  @Output() buttonSubmitted: boolean = false;

  // ngOnInit() {
  //   // we will initialize our form model here
  //   // the short way
  //   // this.checkInForm = this._fb.group({
  //   // 	partySize: ['', [<any>Validators.required]],
  //   // 	mobilePhoneNumber: ['', [<any>Validators.required]]
  //   // });
  // }

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
