import { Request } from 'express';

export interface iCarBrand {
  id?: string;
  brandName?: string;
  models?: iCarModel[];
  posts?: iPost[];
}

export interface iCarModel {
  id?: string;
  modelName?: string;
  post?: iPost[];
  brand?: iCarBrand;
  carBrandId?: string;
}

export interface iBanTypes {
  id?: string;
  banName?: string;
  posts?: iPost[];
}

export interface iGearBoxTypes {
  id?: string;
  gearBoxName?: string;
  posts?: iPost[];
}

// export interface iCategory {
//   id?: string;
//   name?: string;
//   about?: string;
//   posts?: iPost[];
// }

export interface iPost {
  id?: string;
  title?: string;
  content?: string;
  author?: iUser;
  carBrand?: iCarBrand;
  carModel?: iCarModel;
  gearBox?: iGearBoxTypes;
  ban?: iBanTypes;
  createdAt?: Date;
}

export interface iUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  city?: string;
  number?: string;
  birthday?: string;
  posts?: iPost[];
  role?: 'User' | 'Admin';
  createdAt?: Date;
}

export interface iReqAuth extends Request {
  user?: iUser;
}

export interface IDecodedToken {
  id?: string;
  user?: iUser;
  iat: number;
  exp: number;
}
