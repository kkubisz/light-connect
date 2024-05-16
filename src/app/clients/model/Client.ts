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
  date: string;
  name?: string;

  //additionalForm
  price: string;
  additional_cost: string;
  petrol: string;
  session_type: string;
  other: string;
};
