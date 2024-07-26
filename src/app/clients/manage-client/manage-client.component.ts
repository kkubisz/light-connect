import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
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
import { Router } from '@angular/router';
import { Client2, ClientStatus } from '../model/Client';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { SnackbarService } from '../../shared/snackbar/service/snackbar.service';
import { FirebaseService } from '../../services/firebase.service';
import { Timestamp } from '@angular/fire/firestore';

export interface PlaceSearchResult {
  address: string;
  location: { lat: number; lng: number };
  name: string;
}

@Component({
  selector: 'app-manage-client',
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
  ],
  templateUrl: './manage-client.component.html',
  styleUrl: './manage-client.component.scss',
})
export class ManageClientComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  clientsFirebaseService = inject(FirebaseService);

  isEditMode = false;
  @Input() clientId!: string;

  autocomplete: google.maps.places.Autocomplete | undefined;

  showSnackBar = false;

  selectedType: string = '';
  isWedding = true;
  isChurchWedding = true;
  summary = '';
  autcompleteData = {} as PlaceSearchResult;

  @ViewChild('inputField') inputField!: ElementRef;
  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  constructor(private ngZone: NgZone) {}

  options = {
    componentRestrictions: { country: 'pl' },
  };

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement,
      this.options
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        if (!place) {
          return;
        }

        if (place.name && place.geometry?.location) {
          const result: PlaceSearchResult = {
            address: this.inputField.nativeElement.value,
            name: place.name,
            location: place.geometry.location.toJSON(),
          };

          this.autcompleteData = result;
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }

  form = this.formBuilder.group({
    basicInformation: this.formBuilder.group({
      groom_name: this.formBuilder.control<string>(''),
      groom_surname: this.formBuilder.control<string>(''),
      groom_location: this.formBuilder.control<string>(''),
      groom_phone_number: this.formBuilder.control<string>(''),
      bride_name: this.formBuilder.control<string>(''),
      bride_surname: this.formBuilder.control<string>(''),
      bride_location: this.formBuilder.control<string>(''),
      bride_phone_number: this.formBuilder.control<string>(''),
      date: this.formBuilder.control<Date>(new Date()),
      venue: this.formBuilder.control<string>(''),
      client_type: this.formBuilder.control<string>('1'),
      name: this.formBuilder.control<string>(''),
      wedding_type: this.formBuilder.control<string>('1'),
      wedding_location: this.formBuilder.control<string>(''),
      civil_location: this.formBuilder.control<string>(''),
      location: this.formBuilder.control<string>(''),
    }),
    additionalInformation: this.formBuilder.group({
      price: this.formBuilder.control<number>(0),
      additional_cost: this.formBuilder.control<number>(0),
      petrol: this.formBuilder.control<number>(0),
      session_type: this.formBuilder.control<string[]>([]),
      other: this.formBuilder.control<string>(''),
    }),
  });

  onSubmit() {}

  ngOnInit(): void {
    if (this.clientId) {
      this.isEditMode = true;

      this.loadData();
    }
  }

  loadData() {
    if (this.clientId) {
      this.clientsFirebaseService
        .getSingleClinet(this.clientId)
        .subscribe((client) => {
          this.generateForm(client);
        });
    }
  }
  generateForm(client: Client2) {
    if (client.client_type !== '1') {
      this.isWedding = false;
    }

    if (client.location) {
      this.autcompleteData = { ...client.location };
    }

    this.form.setValue({
      basicInformation: {
        groom_name: client.groom_name ?? '',
        groom_surname: client.groom_surname ?? '',
        groom_location: client.groom_location ?? '',
        groom_phone_number: client.groom_phone_number ?? '',
        bride_name: client.bride_name ?? '',
        bride_surname: client.bride_surname ?? '',
        bride_location: client.bride_location ?? '',
        bride_phone_number: client.bride_phone_number ?? '',
        date: client.date ? new Date(client.date.seconds * 1000) : new Date(),
        venue: client.venue ?? '',
        client_type: client.client_type ?? '1',
        location: client.location?.name ?? '',
        name: client.name ?? '',
        wedding_type: client.wedding_type ?? '1',
        wedding_location: client.wedding_location ?? '',
        civil_location: client.civil_location ?? '',
      },
      additionalInformation: {
        price: client.price ?? 0,
        additional_cost: client.additional_cost ?? 0,
        petrol: client.petrol ?? 0,
        session_type: client.session_type ?? [],
        other: client.other ?? '',
      },
    });
  }

  onChange($event: MatRadioChange) {
    this.isWedding = false;

    this.selectedType = $event.value;
    console.log(this.selectedType);

    if (this.selectedType === '1') {
      this.isWedding = true;
    }
  }

  onChangeWeddingType($event: MatRadioChange) {
    console.log('aaa', $event);

    this.isChurchWedding = false;

    if ($event.value === '1') {
      this.isChurchWedding = true;
    }
  }

  generateSummary(formGroup: FormGroup) {
    console.log('summary', formGroup);

    this.summary = '';
    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName) as FormGroup;

      this.summary += this.mapGroupForm(controlName);

      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((singleForm) => {
          const test = control.get(singleForm);

          if (test) {
            if (
              test.value ||
              (Array.isArray(test.value) && test.value.length)
            ) {
              this.summary += `<p class="capitalize"><strong>${this.formatControlName(
                singleForm
              )}:</strong> ${test.value}</p>`;
            }
          }
        });
      }
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
      { id: 4, name: 'produkty_zamowione', status: false, category: 'after' },
      { id: 5, name: 'produkty_oddane', status: false, category: 'after' },
      { id: 6, name: 'zaplacono', status: false, category: 'after' },
    ];

    const fooData: PlaceSearchResult = this.autcompleteData;

    console.log('fooo', fooData);
    console.log('aazxczx', this.autcompleteData);

    const data = {
      ...this.form.getRawValue().additionalInformation,
      ...this.form.getRawValue().basicInformation,
      location: fooData,
      date: Timestamp.fromDate(this.form.getRawValue().basicInformation.date),
    };

    if (this.isEditMode) {
      this.clientsFirebaseService.updateClient(data, this.clientId).subscribe({
        next: () => {
          console.log('asaaaa', data);

          this.snackbarService.show('All data has been saved', 'check');

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      const finalData = { ...data, client_status: initialStatuses };

      this.clientsFirebaseService.addTodo(finalData).subscribe({
        next: () => {
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
}
