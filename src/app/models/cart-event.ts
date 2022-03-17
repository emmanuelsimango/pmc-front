import { PredefinedPackage } from "./predefined-package";

export interface CartEvent {
  product:PredefinedPackage,
  'action':boolean
}
