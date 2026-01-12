
export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  redirectUrl: string;
}

export interface ImageItem {
  id: number;
  url: string;
  alt: string;
}

export interface AppConfig {
  plans: Plan[];
  images: ImageItem[];
}
