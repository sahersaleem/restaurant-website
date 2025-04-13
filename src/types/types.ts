export interface TimingSlot {
  day: string;
  slots: string[];
};

export interface IRestaurant {
  restaurantName: string;
  address: string;
  password: string;
  confirmPassword: string;
  description: string;
  timings?: {
    day:string,
    slots: string[];

  }[];
  phoneNumber: string;
  googlePage: string;
  website_link: string;
  cuisineType: string;
  logo: string;
  role: "Owner";
}
