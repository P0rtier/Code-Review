import { IUnassignedReview } from "./IUnassignedReview";
import { IAssignedReview } from "./IAssignedReview";

export interface IProject {
  name: string;
  assignedReviews: IAssignedReview[];
  unassignedReviews: IUnassignedReview[];
}
