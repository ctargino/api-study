export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IParamsUserDTO {
  limit: number;
  offset: number;
}

export interface IUpdateUserDTO {
  name?: string;
  password?: string;
}
