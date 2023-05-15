export interface IReviewerProps {
  displayName: string;
  uniqueName: string;
  activeReviews: number;
  teamNames: string[];
  availability: boolean;
  project: string;
  reviewId: string;
}
