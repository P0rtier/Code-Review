export interface IRequestedReview {
  id: string;
  header: string;
  scheduledTo: string;
  scheduled: Date;
  team: string;
  pullRequest: string;
  description: string;
}