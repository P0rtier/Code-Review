import { ITeamMember } from "../../../../common/interfaces/ITeamMember";

export interface ITeamSearchResultProps {
  teamMembers: ITeamMember[];
  resolveTeamMember: () => void;
}
