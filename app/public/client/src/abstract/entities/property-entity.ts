import { ConditionTypeEnum } from "../enums/condition-type-enum";
import { PropertyTypeEnum } from "../enums/property-type-enum";

export type PropertyEntity = {
  id: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  bathrooms: number;
  bedrooms: number;
  price: number;
  total_area: number;
  constructed_area: number;
  parking_spaces: number;
  property_type: PropertyTypeEnum;
  condition_type: ConditionTypeEnum;
  url: string;
  created_at: string;
  updated_at: string;
};

export type CreatePropertyDto = {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  bathrooms: number;
  bedrooms: number;
  price: number;
  total_area: number;
  constructed_area: number;
  parking_spaces: number;
  property_type: PropertyTypeEnum;
  condition_type: ConditionTypeEnum;
  url: string;
};
