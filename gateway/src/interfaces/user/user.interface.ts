import { IEvent } from "@src/interfaces/event/event";

export interface IUserCreate {
  id: string;
  email: string;
}
export interface IUser extends IUserCreate {
  consents?: IEvent[];
}

export interface IUserDelete {
  id: string;
}
