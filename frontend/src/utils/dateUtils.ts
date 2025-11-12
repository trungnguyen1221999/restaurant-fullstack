/**
 * Date and time utilities for restaurant booking
 */

export const generateAvailableDates = (daysCount: number = 14) => {
  const dates = [];
  for (let i = 0; i < daysCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push({
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  }
  return dates;
};

export const generateTimeSlots = () => {
  const slots: string[] = [];
  const hours = [11, 12, 13, 14, 18, 19, 20, 21]; // giờ mở cửa
  const minutes = [0, 30]; // mỗi giờ có 2 slot: :00 và :30

  for (const h of hours) {
    for (const m of minutes) {
      slots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      );
    }
  }

  return slots;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
