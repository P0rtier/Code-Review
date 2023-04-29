import { SystemStyleObject } from "@chakra-ui/react";

export interface INotificationComponentProps {
  id: string;
  type: string;
  title: string;
  link: string;
  onDelete: (id: string) => void;
}