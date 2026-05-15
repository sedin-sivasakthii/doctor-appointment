export interface Slot {
  time: string;
  available: boolean;
}

export interface AvailabilityDay {
  date: string;
  slots: Slot[];
}

export interface Doctor {
  id: string | number;
  name: string;
  speciality: string;
  location: string;
  experience: number;
  consultationFee: number;
  rating?: number;
  about?: string;
  image?: string;
  reviews: string[];
  availability: AvailabilityDay[];
}
