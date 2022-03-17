import { Item } from "./item";

export interface Package {
  package_name: string,
  package_frequency_id: number,
  user_id: number,
  recipient: number,
  token: string,
  items_list: Item[],
}
