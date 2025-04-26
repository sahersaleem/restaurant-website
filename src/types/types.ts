export interface TimingSlot {
  day: string;
  slots: string[];
}

export interface IRestaurant {
  restaurantName: string;
  address: string;
  password: string;
  _id: string;
  confirmPassword: string;
  description: string;
  timings?: {
    days: string;
    slots: string[];
  }[];
  phoneNumber: string;
  googlePage: string;
  website_link: string;
  cuisineType: string;
  logo: string;
  role: "Owner";
  status: "pending" | "approved"|"reject",
  pdfLinks:string
}

export interface IUsers {
  _id: string;
  date_of_birth: string;
  email: string;
  forename: string;
  role: string;
  town: string;
}
