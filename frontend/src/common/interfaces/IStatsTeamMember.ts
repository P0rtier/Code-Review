export interface IStatsTeamMember {
  displayName: string;
  uniqueName: string;
  reviewStats: {
    done: number;
    active: number;
    avgReviewHours: number;
  };
}
