import { IRequestedReview } from "./IRequestedReview";
import IAssignedReview from "./IAssignedReview";

export interface IProject {
  name: string;
  assignedReviews: IAssignedReview[];
  unassignedReviews: IRequestedReview[];
}
