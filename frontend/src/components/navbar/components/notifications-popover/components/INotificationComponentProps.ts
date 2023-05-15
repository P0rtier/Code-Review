export interface INotificationComponentProps {
  id: string;
  type: string;
  description: string;
  link: string;
  onDelete: (id: string) => void;
}
