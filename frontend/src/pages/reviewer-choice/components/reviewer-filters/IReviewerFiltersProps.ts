import { IReviewerFilters } from "../../../../common/interfaces/IReviewerFilters";

export interface IReviewerFiltersProps {
    setFilters: (filters: IReviewerFilters) => void;
    filters: IReviewerFilters;
    defaultFilters: IReviewerFilters;
    teams: string[];
}