export interface Review {
  id: number;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

export interface Expert {
  id: number;
  name: string;
  calcomUsername?: string;
  calcomEventType?: string;
  title: string;
  company: string;
  image: string;
  rate: number;
  rating: number;
  reviews: Review[];
  expertise: string[];
  nextAvailable: string;
  popular: boolean;
  about: string;
  experience: {
    title: string;
    company: string;
    duration: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
} 