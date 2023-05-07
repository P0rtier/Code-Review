export interface INotificationComponentProps {
  id: string;
  type: string;
  title: string;
  link: string;
  onDelete: (id: string) => void;
}
