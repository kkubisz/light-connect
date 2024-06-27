import { Timestamp } from '@angular/fire/firestore';

export type Client = {
  id: string;
  client_type: string; // can be const
  groom_name?: string;
  groom_surname?: string;
  groom_location?: string;
  groom_phone_number?: string;
  bride_name?: string;
  bride_surname?: string;
  bride_location?: string;
  bride_phone_number?: string;
  wedding_type?: string;
  wedding_location?: string;
  civil_location?: string;
  church_location?: string;
  venue?: string;
  location2?: {
    address: string;
    name?: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  date: Timestamp;
  name?: string;

  //additionalForm
  price: number;
  additional_cost: number;
  petrol: number;
  session_type: string[];
  other: string;
  client_status?: ClientStatus[];
};

export interface ClientStatus {
  id: number;
  name: string;
  status: boolean;
  category: 'before' | 'after';
}

export type Client2 = {
  client_type: string; // can be const
  groom_name?: string;
  groom_surname?: string;
  groom_location?: string;
  groom_phone_number?: string;
  bride_name?: string;
  bride_surname?: string;
  bride_location?: string;
  bride_phone_number?: string;
  wedding_type?: string;
  wedding_location?: string;
  civil_location?: string;
  church_location?: string;
  venue?: string;
  location?: {
    address: string;
    name?: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  date: Timestamp;
  name?: string;

  //additionalForm
  price: number;
  additional_cost: number;
  petrol: number;
  session_type: string[];
  other: string;
  client_status?: ClientStatus[];
};

export interface ClientStatus {
  id: number;
  name: string;
  status: boolean;
  category: 'before' | 'after';
}
