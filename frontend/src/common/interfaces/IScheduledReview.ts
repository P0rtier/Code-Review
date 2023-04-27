export default interface IScheduledReview {
  id: string;
  title: string;
  scheduledByName: string;
  scheduledByEmail: string;
  createdDate: Date;
  project: string;
  link: string;
  tags: string[];
}
