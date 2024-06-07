import { Component, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { JsonPipe, NgFor } from '@angular/common';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { ClientsService } from '../data-access/clients.service';
import { Router } from '@angular/router';
import { ClientStatus } from '../model/Client';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { SnackbarService } from '../../shared/snackbar/service/snackbar.service';
import { PlaceAutocompleteComponent } from '../../shared/place-autocomplete/place-autocomplete.component';

type FormType = {
  basicInformation: FormGroup<{
    groom_name: FormControl<string>;
    groom_surname: FormControl<string>;
    groom_location: FormControl<string>;
    groom_phone_number: FormControl<string>;
    bridge_name: FormControl<string>;
    bridge_surname: FormControl<string>;
    bridge_location: FormControl<string>;
    bridge_phone_number: FormControl<string>;
    location: FormControl<string>;
    date: FormControl<string>;
    venue: FormControl<string>;
    client_type: FormControl<string>;
    name: FormControl<string>;
    wedding_type: FormControl<string>;
    wedding_location: FormControl<string>;
    session_type: FormControl<string>;
  }>;
  additionalInformation: FormGroup<{
    price: FormControl<string>;
    additional_cost: FormControl<string>;
    petrol: FormControl<string>;
    other: FormControl<string>;
  }>;
};

@Component({
  selector: 'app-add-new-client',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: false },
    },
    provideNativeDateAdapter(),
  ],
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatChipsModule,
    JsonPipe,
    NgFor,
    MatRadioModule,
    SnackbarComponent,
    PlaceAutocompleteComponent,
  ],
  templateUrl: './add-new-client.component.html',
  styleUrl: './add-new-client.component.scss',
})
export class AddNewClientComponent implements OnInit {
  onChangeWeddingLocation($event: MatRadioChange) {
    throw new Error('Method not implemented.');
  }
  private formBuilder = inject(NonNullableFormBuilder);
  private clientService = inject(ClientsService);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  showSnackBar = false;

  selectedType: string = '';
  isWedding = true;
  isChurchWedding = true;

  fromValues: any;
  summary = '';

  form = this.formBuilder.group({
    basicInformation: this.formBuilder.group({
      groom_name: this.formBuilder.control<string>(''),
      groom_surname: this.formBuilder.control<string>(''),
      groom_location: this.formBuilder.control<string>(''),
      groom_phone_number: this.formBuilder.control<string>(''),
      bridge_name: this.formBuilder.control<string>(''),
      bridge_surname: this.formBuilder.control<string>(''),
      bridge_location: this.formBuilder.control<string>(''),
      bridge_phone_number: this.formBuilder.control<string>(''),
      location: this.formBuilder.control<string>(''),
      date: this.formBuilder.control<string>(''),
      venue: this.formBuilder.control<string>(''),
      client_type: this.formBuilder.control<string>('1'),
      name: this.formBuilder.control<string>(''),
      wedding_type: this.formBuilder.control<string>('1'),
      wedding_location: this.formBuilder.control<string>(''),
      civil_location: this.formBuilder.control<string>(''),
    }),
    additionalInformation: this.formBuilder.group({
      price: this.formBuilder.control<string>(''),
      additional_cost: this.formBuilder.control<string>(''),
      petrol: this.formBuilder.control<string>(''),
      session_type: this.formBuilder.control<string>(''),
      other: this.formBuilder.control<string>(''),
    }),
  });

  onSubmit() {
    console.log('submit');
  }

  ngOnInit(): void {}

  onChange($event: any) {
    this.isWedding = false;

    this.selectedType = $event.value;
    console.log(this.selectedType);

    if (this.selectedType === '1') {
      this.isWedding = true;
    }
  }

  onChangeWeddingType($event: any) {
    this.isChurchWedding = false;

    if ($event.value === '1') {
      this.isChurchWedding = true;
    }
  }

  generateSummary(formGroup: any) {
    this.summary = '';
    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName);

      this.summary += this.mapGroupForm(controlName);

      Object.keys(control.controls).forEach((singleForm) => {
        const test = control.get(singleForm);

        if (test) {
          if (
            test.value ||
            (Array.isArray(control.value) && control.value.length)
          ) {
            this.summary += `<p class="capitalize"><strong>${this.formatControlName(
              singleForm
            )}:</strong> ${test.value}</p>`;
          }
        }
      });
    });

    this.summary += '</div>';
    return this.summary;
  }

  formatControlName(name: string): string {
    return name.replace('_', ' ');
  }

  mapGroupForm(controlName: string): string {
    const forms: Record<string, string> = {
      basicInformation: `<div><h2>Basic Information</h2></div>`,
      additionalInformation: `<div><h2>Additional Information</h2></div>`,
    };

    return forms[controlName] || '';
  }

  addClient() {
    const initialStatuses: ClientStatus[] = [
      { id: 1, name: 'umowa', status: true, category: 'before' },
      { id: 2, name: 'zadatek', status: false, category: 'before' },
      { id: 3, name: 'sfotografowano', status: false, category: 'before' },
      { id: 4, name: 'zaplacono', status: false, category: 'before' },
      { id: 5, name: 'produkty_zamowione', status: false, category: 'before' },
      { id: 6, name: 'produkty_oddane', status: false, category: 'before' },
    ];

    const data = {
      ...this.form.getRawValue().additionalInformation,
      ...this.form.getRawValue().basicInformation,
      client_status: initialStatuses,
    };

    this.clientService.add(data).subscribe({
      next: (client) => {
        this.showSnackBar = true;

        this.snackbarService.show(
          'Congratulation. You get new client',
          'check'
        );

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
