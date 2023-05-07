import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useStyleConfig,
} from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { useLocation } from "react-router";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import styles from "./ReviewerChoice.module.scss";
import { joinClasses } from "../../common/utils/joinClasses";
import { SearchIcon } from "@chakra-ui/icons";
import { ReviewToAssignInfo } from "../../components/review-to-assign-info/ReviewToAssignInfo";
import { ReviewerFilters } from "./components/reviewer-filters/ReviewerFilters";
import { IReviewerFilters } from "../../common/interfaces/IReviewerFilters";
import { IReviewer } from "../../common/interfaces/IReviewer";
import { Reviewer } from "./components/reviewer/Reviewer";
import { IUnassignedReview } from "../../common/interfaces/IUnassignedReview";
import agent from "../../common/api/agent";
import { addDays } from "date-fns";
import { Placeholder } from "../../components/placeholders/placeholder/Placeholder";

export const ReviewerChoice = () => {
  const primaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const location = useLocation();
  const review: IUnassignedReview = location.state.review;
  const startDate = new Date();
  const MAX_DAYS_FROM_TODAY = 5;
  const endDate = addDays(new Date(), MAX_DAYS_FROM_TODAY);
  const defaultFilters = {
    isAscending: true,
    isUnavailableShown: true,
    maxReviews: undefined,
    selectedTeam: undefined,
    startDate: new Date(),
    endDate: new Date(),
  } as IReviewerFilters;

  const [filters, setFilters] = useState<IReviewerFilters>(defaultFilters);
  let [reviewers, setReviewers] = useState<IReviewer[] | undefined>();
  let [filteredReviewers, setFilteredReviewers] = useState<
    IReviewer[] | undefined
  >();
  const [searchedReviewers, setSearchedReviewers] = useState<
    IReviewer[] | undefined
  >();
  const [searchQuery, setSearchQuery] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const setNewFilters = (newFilters: IReviewerFilters): void => {
    if (
      newFilters.startDate !== filters.startDate &&
      newFilters.endDate !== filters.endDate
    ) {
      //get data from backend
    }

    setFilters(newFilters);
  };

  const filterReviewers = () => {
    let newFilteredReviewers = reviewers;
    let unavailableReviewers: IReviewer[] = [];

    if (newFilteredReviewers) {
      if (filters.maxReviews) {
        newFilteredReviewers = newFilteredReviewers.filter(
          (reviewer) =>
            reviewer.activeReviews <=
            (filters.maxReviews ?? Number.MAX_SAFE_INTEGER)
        );
      }

      if (filters.selectedTeam && filters.selectedTeam !== "") {
        newFilteredReviewers = newFilteredReviewers.filter(
          (reviewer) =>
            reviewer.teamName === (filters.selectedTeam ?? reviewer.teamName)
        );
      }

      if (filters.isUnavailableShown) {
        unavailableReviewers = newFilteredReviewers.filter(
          (reviewer) => !reviewer.availability
        );
      }

      newFilteredReviewers = newFilteredReviewers.filter(
        (reviewer) => reviewer.availability
      );

      if (filters.isAscending) {
        newFilteredReviewers = newFilteredReviewers.sort(
          (a, b) => a.activeReviews - b.activeReviews
        );
      } else {
        newFilteredReviewers = newFilteredReviewers.sort(
          (a, b) => b.activeReviews - a.activeReviews
        );
      }

      newFilteredReviewers.concat(unavailableReviewers);
    }

    setFilteredReviewers(newFilteredReviewers);
  };

  const filterSearchReviewers = () => {
    let newSearchedReviewers = filteredReviewers;

    if (newSearchedReviewers) {
      if (searchQuery && searchQuery !== "") {
        newSearchedReviewers = newSearchedReviewers.filter((reviewer) =>
          reviewer.displayName
            .toLowerCase()
            .includes(searchQuery.toLowerCase() ?? "")
        );
      }
    }

    setSearchedReviewers(newSearchedReviewers);
  };

  const getUniqueTeams = () => {
    if (reviewers) {
      return Array.from(
        new Set(reviewers.map((reviewer) => reviewer.teamName))
      );
    } else {
      return [];
    }
  };

  const getReviewers = () => {
    if (searchedReviewers) {
      return searchedReviewers.map((reviewer) => (
        <Reviewer
          {...reviewer}
          reviewId={review.id}
          project={review.project}
          key={reviewer.uniqueName}
        />
      ));
    }
  };

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    filterReviewers();
  }, [filters, reviewers]);

  useEffect(() => {
    filterSearchReviewers();
  }, [searchQuery, filteredReviewers]);

  useEffect(() => {
    agent.Reviewers.getAll(review.project, startDate, endDate).then(
      (response: IReviewer[]) => {
        setReviewers(response);
        setLoading(false);
      }
    );
  }, []);
  //#endregion

  return (
    <PageWrapper smallGap={true}>
      <div className={styles.container}>
        <div className={styles.reviewContainer}>
          <ReviewToAssignInfo {...review} fullWidth={true} />
        </div>
        <div className={styles.filterContainer}>
          <div className={joinClasses(styles.bar, styles.searchBarContainer)}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
                className={styles.searchInputLeft}
              />
              <Input
                variant={"search"}
                placeholder={"Search..."}
                value={searchQuery ?? ""}
                defaultValue={undefined}
                onChange={handleSearchChanged}
              />
            </InputGroup>
            <ReviewerFilters
              filters={filters}
              setFilters={setNewFilters}
              defaultFilters={defaultFilters}
              teams={getUniqueTeams()}
            />
          </div>
          {loading ? (
            <Placeholder header={"Loading reviewers..."} />
          ) : (
            <Box className={styles.searchResult} __css={primaryComponent}>
              {getReviewers()}
            </Box>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
