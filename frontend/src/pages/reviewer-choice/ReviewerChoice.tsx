import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useStyleConfig,
} from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { useLocation, useParams } from "react-router";
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
  const { id } = useParams<{ id: string }>();
  const MAX_DAYS_FROM_TODAY = 5;
  const defaultFilters = {
    isAscending: true,
    isUnavailableShown: true,
    maxReviews: undefined,
    selectedTeam: undefined,
    startDate: new Date(),
    endDate: new Date(),
  } as IReviewerFilters;

  const [filters, setFilters] = useState<IReviewerFilters>(defaultFilters);
  const [review, setReview] = useState<IUnassignedReview>();
  const [reviewers, setReviewers] = useState<IReviewer[] | undefined>();
  const [filteredReviewers, setFilteredReviewers] = useState<
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
        newFilteredReviewers = newFilteredReviewers.filter((reviewer) =>
          reviewer.teamNames.includes(
            filters.selectedTeam ?? reviewer.teamNames[0]
          )
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
        new Set(reviewers.map((reviewer) => reviewer.teamNames).flat(1))
      );
    } else {
      return [];
    }
  };

  const getReviewers = () => {
    if (searchedReviewers && review) {
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

  const cachedFilterReviewers = React.useCallback(filterReviewers, [
    filters,
    reviewers,
  ]);
  const cachedFilterSearchReviewers = React.useCallback(filterSearchReviewers, [
    searchQuery,
    filteredReviewers,
  ]);

  useEffect(() => {
    cachedFilterReviewers();
  }, [cachedFilterReviewers]);

  useEffect(() => {
    cachedFilterSearchReviewers();
  }, [cachedFilterSearchReviewers]);

  useEffect(() => {
    if (!review) return;

    const startDate = new Date();
    const endDate = addDays(startDate, MAX_DAYS_FROM_TODAY);
    agent.Reviewers.getAll(review.project, startDate, endDate).then(
      (response: IReviewer[]) => {
        setReviewers(response);
        setLoading(false);
      }
    );
  }, [review]);

  useEffect(() => {
    if (location.state) {
      setReview(location.state.review);
      return;
    }

    if (id) {
      agent.WorkItems.getById(id).then((response: IUnassignedReview) => {
        setReview(response);
      });
    }
  }, [location.state, id]);

  return (
    <PageWrapper smallGap={true}>
      <div className={styles.container}>
        <div className={styles.reviewContainer}>
          {review ? (
            <ReviewToAssignInfo {...review} fullWidth={true} />
          ) : (
            <Placeholder header={"Loading review..."} />
          )}
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
