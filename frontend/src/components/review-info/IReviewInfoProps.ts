import { SystemStyleObject } from "@chakra-ui/react";

export interface IReviewInfoProps {
  header: string;
  scheduledTo: string;
  scheduled: string;
  team: string;
  pullRequest: string;
  description: string;
  style: SystemStyleObject;
}
