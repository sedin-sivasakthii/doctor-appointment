import { AvailabilityDay } from "../../core/models/doctor.model";

export function getNextAvailableSlots(
    availability: AvailabilityDay[] ):string {
    for (const day of availability) {
        for (const slot of day.slots) {
            if (slot.available) {
               const formattedDate = formatDate(day.date);
               return `${formattedDate} at ${slot.time}`;
            }
        }
    }
    return 'No available slots';
}
export function formatDate(date: string ): string {
    const today = 
    new Date().toISOString().split('T')[0];
    const tomorrowDate = new Date();

    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];
    if (date === today) {
        return 'Today';
    } else if (date === tomorrow) {
        return 'Tomorrow';
    }
    return date;
}

export function hasAvailabilityToday(
  availability: AvailabilityDay[]
): boolean {

  const today =
    new Date().toISOString().split('T')[0];

  const todayData =
    availability.find(
      item => item.date === today
    );

  if (!todayData) {
    return false;
  }

  return todayData.slots.some(
    slot => slot.available
  );
}
export function hasAvailabilityTomorrow(
  availability: AvailabilityDay[]
): boolean {

  const tomorrowDate = new Date();

  tomorrowDate.setDate(
    tomorrowDate.getDate() + 1
  );

  const tomorrow =
    tomorrowDate
      .toISOString()
      .split('T')[0];

  const tomorrowData =
    availability.find(
      item => item.date === tomorrow
    );

  if (!tomorrowData) {
    return false;
  }

  return tomorrowData.slots.some(
    slot => slot.available
  );
}

