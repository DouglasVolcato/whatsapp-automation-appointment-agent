export type RealStateAgencyEntity = {
  id: string;
  name: string;
  phone: string;
  email: string;
  site: string;
  address: string;
  created_at: string;
  updated_at: string;
};

export type CreateRealStateAgencyDto = {
  name: string;
  phone: string;
  email: string;
  site: string;
  address: string;
};
