export interface BookingEntry {
    id: string;
    bookingRef: string;
    userId?: string;

    doctorId?: string;
    doctorName: string;
    doctorImage: string;
    speciality: string;

    date: string;
    time: string;
    complaint: string;

    consultationFee: number;
    gst: number;
    platformFee: number;
    amountPaid: number;
    paymentMethod: 'UPI' | 'creditCard' | 'netBanking' | 'Wallet' | '';
    
    status: 'Confirmed' | 'Cancelled' | 'Pending';
    bookedAt: string;
}
