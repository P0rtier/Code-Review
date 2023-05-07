import { SystemStyleObject } from "@chakra-ui/react";

export interface IAssignedReviewInfoProps {
  title: string;
  scheduledByName: string;
  createdDate: Date;
  project: string;
  style: SystemStyleObject;
  tags: string[];
  link: string;
}
