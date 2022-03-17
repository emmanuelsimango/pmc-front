import { Product } from './product';
import { Item } from "./item";
export interface PackageCategory {
  package_category_id: number;
  user_id: number;
  package_category_name: string;
  url: string;
  frequency_id: number;
  frequency_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  receipient_id: string;
  sale_id: number;
  usd_sold_value: number;
  products: Product[];
}
