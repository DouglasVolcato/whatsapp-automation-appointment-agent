import { AccessTypeEnum } from "../enums/access-type-enum";

export type AccessEntity = {
  id: string;
  email: string;
  access_type: AccessTypeEnum;
  agency_id: string;
  agency: string;
  created_at: string;
  updated_at: string;
};

export type CreateAccessDto = {
  email: string;
  password: string;
  access_type: AccessTypeEnum;
  agency_id: string;
};
