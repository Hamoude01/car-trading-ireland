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
