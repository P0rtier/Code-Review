import { IRequestedReview } from "./IRequestedReview";
import IScheduledReview from "./IScheduledReview";

export interface IProject {
    name: string;
    assignedReviews: IScheduledReview[];
    unassignedReviews: IRequestedReview[];
}