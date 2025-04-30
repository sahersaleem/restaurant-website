export interface TimingSlot {
  days: string;
  slots: string[];
}

export interface IRestaurant {
  restaurantName?: string;
  address?: string;
  password?: string;
  _id?: string;
  confirmPassword?: string;
  thumbnail?:string,
  description?: string;
  timings?: {
    day?: string;
    slots: string[];
  }[];
  phoneNumber?: string;
  googlePage?: string;
  website_link?: string;
  cuisineType?: string;
  logo?: string;
  role?: "Owner";
  status?: "pending" | "approved"|"reject",
  pdfLinks?:string
  isFeatured?:boolean
}

export interface IUsers {
  _id: string;
  date_of_birth: string;
  email: string;
  forename: string;
  role: string;
  town: string;
}
