export interface ITeamMember {
  displayName: string;
  uniqueName: string;
  teamName: string;
  reviewsInfo: {
    done: number;
    active: number;
    avgTime: number;
  };
}
