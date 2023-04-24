import { SystemStyleObject } from "@chakra-ui/react";

export interface IWorkItemInfoProps {
  header: string;
  state: string;
  activityDate: Date;
  tags: string[];
  style: SystemStyleObject;
  fullWidth?: boolean;
}
