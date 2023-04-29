export interface IWorkItemInfoProps {
  id: string;
  title: string;
  project: string;
  link: string;
  createdDate: Date;
  tags: string[];
  fullWidth?: boolean;
}
