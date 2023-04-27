import { SystemStyleObject } from "@chakra-ui/react";

export interface IReviewInfoProps {
  title: string;
  scheduledBy: string;
  createdDate: string;
  project: string;
  style: SystemStyleObject;
  tags: string[];
}
