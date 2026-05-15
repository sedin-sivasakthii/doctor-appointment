export interface Slot {
  time: string;
  available: boolean;
}

export interface AvailabilityDay {
  date: string;
  slots: Slot[];
}

export interface Review {
  name: string;
  comment: string;
  time: string;
}

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  location: string;
  experience: number;
  consultationFee: number;

  reviews: Review[];
  availability: AvailabilityDay[];
}