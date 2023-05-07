export interface IReviewerFilters {
  isAscending: boolean;
  isUnavailableShown: boolean;
  maxReviews?: number;
  selectedTeam?: string;
  startDate: Date;
  endDate: Date;
}
