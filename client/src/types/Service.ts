export interface ServiceProps {
  _id: string;
  name: string;
  nameEn: string;
  price: number;
  imageUrl: string;
  description: string;
  features: string[];
  index: number;
  isActive?: boolean;
  __v: number;
}
