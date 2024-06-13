import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
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
import { Client } from '../model/Client';
import { SnackbarService } from '../../shared/snackbar/service/snackbar.service';

@Component({
  selector: 'app-edit-client',
  standalone: true,
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
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: false },
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
})
export class EditClientComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private clientService = inject(ClientsService);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  @Input() clientId!: string;

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
      location: this.formBuilder.group({
        name: this.formBuilder.control<string>(''),
        address: this.formBuilder.control<string>(''),
        location: this.formBuilder.group({
          lat: this.formBuilder.control<number>(0),
          lng: this.formBuilder.control<number>(0),
        }),
      }),
      date: this.formBuilder.control<string>(''),
      client_type: this.formBuilder.control<string>('1'),
      name: this.formBuilder.control<string>(''),
      wedding_type: this.formBuilder.control<string>('1'),
      wedding_location: this.formBuilder.control<string>(''),
      civil_location: this.formBuilder.control<string>(''),
    }),
    additionalInformation: this.formBuilder.group({
      price: this.formBuilder.control<number>(0),
      additional_cost: this.formBuilder.control<number>(0),
      petrol: this.formBuilder.control<number>(0),
      session_type: this.formBuilder.control<string[]>([]),
      other: this.formBuilder.control<string>(''),
    }),
  });

  onSubmit() {
    console.log('submit');
  }

  ngOnInit(): void {
    console.log(this.clientId);
    if (this.clientId) {
      this.clientService.getClient(this.clientId).subscribe({
        next: (client) => {
          if (client.body) {
            this.generateForm(client.body);
          }
        },
      });
    }
  }

  generateForm(client: Client) {
    this.form = this.formBuilder.group({
      basicInformation: this.formBuilder.group({
        groom_name: this.formBuilder.control<string>(client.groom_name ?? ''),
        groom_surname: this.formBuilder.control<string>(
          client.groom_surname ?? ''
        ),
        groom_location: this.formBuilder.control<string>(
          client.groom_location ?? ''
        ),
        groom_phone_number: this.formBuilder.control<string>(
          client.groom_phone_number ?? ''
        ),
        bridge_name: this.formBuilder.control<string>(client.bridge_name ?? ''),
        bridge_surname: this.formBuilder.control<string>(
          client.bridge_surname ?? ''
        ),
        bridge_location: this.formBuilder.control<string>(
          client.bridge_location ?? ''
        ),
        bridge_phone_number: this.formBuilder.control<string>(
          client.bridge_phone_number ?? ''
        ),

        location: this.formBuilder.group({
          name: this.formBuilder.control<string>(''),
          address: this.formBuilder.control<string>(''),
          location: this.formBuilder.group({
            lat: this.formBuilder.control<number>(0),
            lng: this.formBuilder.control<number>(0),
          }),
        }),
        date: this.formBuilder.control<string>(client.date ?? ''),
        client_type: this.formBuilder.control<string>(
          client.client_type ?? '1'
        ),
        name: this.formBuilder.control<string>(client.name ?? ''),
        wedding_type: this.formBuilder.control<string>(
          client.wedding_type ?? '1'
        ),
        wedding_location: this.formBuilder.control<string>(
          client.wedding_location ?? ''
        ),
        civil_location: this.formBuilder.control<string>(
          client.civil_location ?? ''
        ),
      }),
      additionalInformation: this.formBuilder.group({
        price: this.formBuilder.control<number>(client.price ?? 0),
        additional_cost: this.formBuilder.control<number>(
          client.additional_cost ?? 0
        ),
        petrol: this.formBuilder.control<number>(client.petrol ?? 0),
        session_type: this.formBuilder.control<string[]>(
          client.session_type ?? []
        ),
        other: this.formBuilder.control<string>(client.other ?? ''),
      }),
    });
  }

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
    const data = {
      ...this.form.getRawValue().additionalInformation,
      ...this.form.getRawValue().basicInformation,
    };

    this.clientService.update(+this.clientId, data).subscribe({
      next: (client) => {
        this.snackbarService.show('All data has been saved', 'check');

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
