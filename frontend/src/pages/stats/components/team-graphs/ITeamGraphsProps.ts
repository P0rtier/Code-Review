import { IStatsTeamMember } from "../../../../common/interfaces/IStatsTeamMember";

export interface ITeamGraphsProps {
  teamMembers: IStatsTeamMember[];
  loading: boolean;
}
