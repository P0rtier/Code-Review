import { SystemStyleObject } from "@chakra-ui/react";

export interface INotificationComponentProps {
    id: string;
    type: string;
    title: string;
    route: string;
    onDelete: (id: string) => void;
  }