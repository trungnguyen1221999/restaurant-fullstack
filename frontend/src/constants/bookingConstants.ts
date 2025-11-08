/**
 * Constants for restaurant booking system
 */

export interface TableType {
  id: string;
  name: string;
  capacity: string;
  price: string;
  description: string;
}

export const TABLE_TYPES: TableType[] = [
  {
    id: "intimate",
    name: "Intimate Corner",
    capacity: "2 people",
    price: "€25",
    description: "Perfect for romantic dinners",
  },
  {
    id: "standard",
    name: "Standard Table",
    capacity: "2-4 people",
    price: "€35",
    description: "Great for small groups",
  },
  {
    id: "family",
    name: "Family Table",
    capacity: "4-6 people",
    price: "€45",
    description: "Ideal for families",
  },
  {
    id: "premium",
    name: "Premium Booth",
    capacity: "6-8 people",
    price: "€65",
    description: "Luxury dining experience",
  },
];

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const RESTAURANT_INFO = {
  rating: "4.9/5",
  reviewCount: "(2.5k reviews)",
  averageDining: "Average dining: 1.5 hours",
  location: "Kauhajoki, Finland",
  phone: "+358 (555) 123-4567",
  email: "trungnguyen1221999@gmail.com",
  bookingHours: "Booking hours: 9AM - 10PM daily",
};
