export type Client = {
  id: string;
  client_type: string; // can be const

  groom_name?: string;
  groom_surname?: string;
  groom_location?: string;
  groom_phone_number?: string;
  bridge_name?: string;
  bridge_surname?: string;
  bridge_location?: string;
  bridge_phone_number?: string;
  wedding_type?: string;
  wedding_location?: string;
  civil_location?: string;
  church_location?: string;
  location: string;
  location2?: {
    address: string;
    name: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  date: string;
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
