export interface Booking {
  id: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  speciality: string;
  date: string;
  slotTime: string;
  amount: number;
  status: 'Confirmed' | 'Cancelled' | 'Pending';
  bookingRef: string;
  complaint?: string;
}
