import { IUserStanding } from "./IUserStanding";

export interface IProjectLeaderboard {
    id: string;
    name: string;
    userStandings: IUserStanding[];
}