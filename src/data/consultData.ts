export interface DoctorAvailability {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  age: number;
  image: string;
  rating: number;
  presence: {
    day: string;
    date: string;
    timeSlot: string;
  }[];
}

export const availableDoctors: DoctorAvailability[] = [
  {
    id: "d1",
    name: "Dr. Amna Saeed",
    specialty: "Senior Dermatologist",
    phone: "+923030042034",
    age: 42,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.9,
    presence: [
      { day: "Monday", date: "May 11", timeSlot: "09:00 AM - 01:00 PM" },
      { day: "Wednesday", date: "May 13", timeSlot: "02:00 PM - 06:00 PM" },
      { day: "Friday", date: "May 15", timeSlot: "10:00 AM - 04:00 PM" }
    ]
  },
  {
    id: "d2",
    name: "Dr. Hassan Ahmed",
    specialty: "Oncology Specialist",
    phone: "+923456789012",
    age: 45,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.8,
    presence: [
      { day: "Tuesday", date: "May 12", timeSlot: "11:00 AM - 03:00 PM" },
      { day: "Thursday", date: "May 14", timeSlot: "09:00 AM - 12:00 PM" }
    ]
  },
  {
    id: "d3",
    name: "Dr. Fatima Zehra",
    specialty: "Skin Cancer Specialist",
    phone: "+923214567890",
    age: 38,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5.0,
    presence: [
      { day: "Monday", date: "May 11", timeSlot: "03:00 PM - 07:00 PM" },
      { day: "Thursday", date: "May 14", timeSlot: "01:00 PM - 05:00 PM" },
      { day: "Saturday", date: "May 16", timeSlot: "10:00 AM - 02:00 PM" }
    ]
  }
];
