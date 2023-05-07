import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useStyleConfig,
} from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import styles from "./ReviewerChoice.module.scss";
import { useLocation } from "react-router";
import agent from "../../common/api/agent";
import { addDays } from "date-fns";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { joinClasses } from "../../common/utils/joinClasses";
import { SearchIcon } from "@chakra-ui/icons";
import { WorkItemInfo } from "./components/work-item-info/WorkItemInfo";
import { ReviewerFilters } from "./components/reviewer-filters/ReviewerFilters";
import { IReviewerFilters } from "../../common/interfaces/IReviewerFilters";
import { ReviewerItem } from "./components/reviewer-item/ReviewerItem";
import { IReviewer } from "../../common/interfaces/IReviewer";
import { IUnassignedReview } from "../../common/interfaces/IUnassignedReview";

export const ReviewerChoice = () => {
  const primaryOrangeComponent = useStyleConfig(
    StyledComponents.PrimaryOrangeComponent
  );

  //#region variables
  const filterBarStyles = useStyleConfig(StyledComponents.FilterBar);
  const primaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const location = useLocation();
  const review: IUnassignedReview = location.state.review;
  const startDate = new Date();
  const MAX_DAYS_FROM_TODAY = 5;
  const endDate = addDays(new Date(), MAX_DAYS_FROM_TODAY);
  const defaultFilters =
    {
      isAscending: true,
      isUnavailableShown: true,
      maxReviews: undefined,
      selectedTeam: undefined,
      startDate: new Date(),
      endDate: new Date(),
    } as IReviewerFilters;

  const [filters, setFilters] = useState<IReviewerFilters>(defaultFilters);
  const [reviewers, setReviewers] = useState<IReviewer[] | undefined>();

  const [filteredReviewers, setFilteredReviewers] = useState<IReviewer[] | undefined>();

  const [searchedReviewers, setSearchedReviewers] = useState<IReviewer[] | undefined>();

  const [searchQuery, setSearchQuery] = useState<string>();
  //#endregion

  //#region methods
  const setNewFilters = (newFilters: IReviewerFilters): void => {

    if (newFilters.startDate !== filters.startDate && newFilters.endDate !== filters.endDate) {
      //get data from backend
    }

    setFilters(newFilters);
  }

  const filterReviewers = () => {
    let newFilteredReviewers = reviewers;
    let unavailableReviewers: IReviewer[] = [];

    if (newFilteredReviewers) {

      if (filters.maxReviews) {
        newFilteredReviewers = newFilteredReviewers
          .filter((reviewer) =>
            reviewer.activeReviews <= (filters.maxReviews ?? Number.MAX_SAFE_INTEGER));

      }

      if (filters.selectedTeam && filters.selectedTeam !== "") {
        newFilteredReviewers = newFilteredReviewers
          .filter((reviewer) => reviewer.teamName === (filters.selectedTeam ?? reviewer.teamName));

      }

      if (filters.isUnavailableShown === true) {
        unavailableReviewers = newFilteredReviewers
          .filter((reviewer) => reviewer.availability === false);

      }

      newFilteredReviewers = newFilteredReviewers
        .filter((reviewer) => reviewer.availability === true);

      if (filters.isAscending) {
        newFilteredReviewers = newFilteredReviewers
          .sort((a, b) => a.activeReviews - b.activeReviews);

      } else {
        newFilteredReviewers = newFilteredReviewers
          .sort((a, b) => b.activeReviews - a.activeReviews);

      }

      newFilteredReviewers = [...newFilteredReviewers, ...unavailableReviewers];
    }

    setFilteredReviewers(newFilteredReviewers);
  }

  const filterSearchReviewers = () => {
    let newSearchedReviewers = filteredReviewers;

    if (newSearchedReviewers) {
      if (searchQuery && searchQuery !== "") {
        newSearchedReviewers = newSearchedReviewers
          .filter((reviewer) => reviewer.displayName.toLowerCase().includes(searchQuery.toLowerCase() ?? ""));

      }
    }

    setSearchedReviewers(newSearchedReviewers);
  }
  //#endregion

  //#region handles
  const getUniqueTeams = () => {
    if (reviewers) {
      return Array.from(new Set(reviewers.map((reviewer) => reviewer.teamName)));
    } else {
      return [];
    }
  }

  const getReviewers = () => {
    if (searchedReviewers) {
      return (
        searchedReviewers.map((reviewer) =>
          <ReviewerItem {...reviewer}
            reviewId={review.id}
            project={review.project}
            key={reviewer.uniqueName}
          />)
      );
    }
  }

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); }

  useEffect(() => {
    filterReviewers();
  }, [filters, reviewers])

  useEffect(() => {
    filterSearchReviewers();
  }, [searchQuery, filteredReviewers])


  useEffect(() => {
    agent.Reviewers.getAll(review.project, startDate, endDate).then((response: IReviewer[]) => {
      setReviewers(response);
    });
  }, []);
  //#endregion

  return (
    <PageWrapper smallGap={true}>
      <div className={styles.container}>
        <div className={styles.reviewContainer}>
          <WorkItemInfo
            {...review}
            fullWidth={true}
          />
        </div>
        <div className={styles.filterContainer}>
          <div className={joinClasses(styles.bar, styles.searchBarContainer)}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
                className={styles.searchInputLeft}
              />
              <Input variant={"search"}
                placeholder={"Search..."}
                value={searchQuery ?? ''}
                defaultValue={undefined}
                onChange={handleSearchChanged} />

            </InputGroup>
            <ReviewerFilters filters={filters}
              setFilters={setNewFilters}
              defaultFilters={defaultFilters}
              teams={getUniqueTeams()} />
          </div>
          <Box className={styles.searchResult} __css={primaryComponent}>
            {getReviewers()}
          </Box>
        </div>
      </div>
    </PageWrapper>
  );
};
