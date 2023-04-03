export default interface IScheduledReview {
  id: string;
  title: string;
  scheduledTo: string;
  scheduled: Date;
  team: string;
  pullRequest: string;
  description: string;
}
