import { SystemStyleObject } from "@chakra-ui/react";

export interface IWorkItemInfoProps {
  title: string;
  project: string;
  createdDate: Date;
  tags: string[];
  style: SystemStyleObject;
  fullWidth?: boolean;
}
