export interface User {
  token: string;
  first_name?: string;
  user_id?:number;
  last_name?: string;
  user_pass?: string;
  email?: string;
  mobile?: string;
  user_type: number;
  added_by: number;
}
