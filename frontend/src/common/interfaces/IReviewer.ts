export interface IReviewer {
  displayName: string;
  uniqueName: string;
  activeReviews: number;
  teamNames: string[];
  availability: boolean;
}
