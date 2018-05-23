import { IUser } from "./Api";

export interface ISession {
    user: IUser | null;
}