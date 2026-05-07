export interface Car {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  transmission: "Manual" | "Automatic";
  engineSize: string;
  bodyType: string;
  colour: string;
  doors: number;
  county: string;
  nctExpiry: string;
  taxExpiry: string;
  description: string;
  features: string[];
  images: string[];
  sellerType: "owner" | "commission";
  featured: boolean;
  dateAdded: string;
  previousOwners: number;
}

export interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  car_make: string;
  car_model: string;
  car_year: string;
  mileage: string;
  asking_price: string;
  description: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  created_at: string;
}
