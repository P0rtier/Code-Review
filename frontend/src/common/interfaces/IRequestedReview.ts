export interface IRequestedReview {
  id: string;
  header: string;
  state: string;
  activityDate: Date;
  tags: string[];
}
