import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
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
import { SortIcon } from "../../assets/icons/SortIcon";
import { SearchIcon } from "@chakra-ui/icons";
import { WorkItemInfo } from "../../components/work-item-info/WorkItemInfo";
import { ReviewerFilters } from "./components/reviewer-filters/ReviewerFilters";
import { IReviewerFilters } from "../../common/interfaces/IReviewerFilters";
import { IReviewer } from "../../common/interfaces/IReviewer";
import { Reviewer } from "./components/reviewer/Reviewer";

export const ReviewerChoice = () => {
  const primaryOrangeComponent = useStyleConfig(
    StyledComponents.PrimaryOrangeComponent
  );

  //#region variables
  const filterBarStyles = useStyleConfig(StyledComponents.FilterBar);
  const primaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const location = useLocation();
  const review = location.state.review;

  const defaultFilters =
    {
      isAscending: false,
      isUnavailableShown: true,
      maxReviews: undefined,
      selectedTeam: undefined,
      startDate: new Date(),
      endDate: new Date(),
    } as IReviewerFilters;

  const [filters, setFilters] = useState<IReviewerFilters>(defaultFilters);
  const reviewersMock: IReviewer[] = [
    {
      displayName: "Sashimi Onosaku Tanokaja",
      uniqueName: "mail@mail.com",
      isAvailable: true,
      scheduledReviews: 2,
      team: "Code-Review",
    },
    {
      displayName: "Name",
      uniqueName: "mail@mail.com",
      isAvailable: true,
      scheduledReviews: 3,
      team: "Test team",
    },
    {
      displayName: "Name",
      uniqueName: "mail@mail.com",
      isAvailable: false,
      scheduledReviews: 5,
      team: "Code-Review",
    },
  ];

  const [reviewers, setReviewers] = useState<IReviewer[]>(reviewersMock);

  const [searchedReviewers, setSearchedReviewers] = useState<IReviewer[]>(reviewers);

  const [searchQuery, setSearchQuery] = useState<string>();
  //#endregion

  //#region methods
  const filterReviewers = (newFilters: IReviewerFilters): void => {
    let filteredReviewers = reviewersMock;

    if (newFilters.startDate !== filters.startDate && newFilters.endDate !== filters.endDate) {
      //get data from backend
    }

    if (newFilters.isUnavailableShown !== true) {

      filteredReviewers = filteredReviewers
        .filter((reviewer) => reviewer.isAvailable === true);

    }

    if (newFilters.maxReviews) {
      filteredReviewers = filteredReviewers
        .filter((reviewer) =>
          reviewer.scheduledReviews < (newFilters.maxReviews ?? Number.MAX_SAFE_INTEGER));

    }

    if (newFilters.selectedTeam && newFilters.selectedTeam !== "") {
      filteredReviewers = filteredReviewers
        .filter((reviewer) => reviewer.team <= (newFilters.selectedTeam ?? reviewer.team));

    }

    if (newFilters.isAscending) {

      filteredReviewers = filteredReviewers
        .sort((a, b) => b.scheduledReviews - a.scheduledReviews);

    } else {

      filteredReviewers = filteredReviewers
        .sort((a, b) => a.scheduledReviews - b.scheduledReviews);

    }

    setFilters(newFilters);
    setReviewers(filteredReviewers);
    filterSearchReviewers();
  }

  const filterSearchReviewers = () => {
    let newSearchedReviewers = reviewers;
    if (searchQuery && searchQuery !== "") {
      console.log(searchQuery)
      newSearchedReviewers = newSearchedReviewers
        .filter((reviewer) => reviewer.displayName.toLowerCase().includes(searchQuery.toLowerCase() ?? ""));

    } else {
      newSearchedReviewers = reviewers;
    }

    setSearchedReviewers(newSearchedReviewers);
  }

  const getUniqueTeams = () => {
    return Array.from(new Set(reviewersMock.map((reviewer) => reviewer.team)));
  }

  const getReviewers = () => {
    return (
      searchedReviewers.map((reviewer) => <Reviewer {...reviewer} />)
    );
  }

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {

    setSearchQuery(e.target.value);
    filterSearchReviewers();
    //this should happen after event
  }
  //#endregion

  return (
    <PageWrapper smallGap={true}>
      <div className={styles.container}>
        <div className={styles.reviewContainer}>
          <WorkItemInfo
            header={review.header}
            activityDate={review.activityDate}
            state={review.state}
            tags={review.tags}
            style={primaryOrangeComponent}
            fullWidth={true}
          />
        </div>
        <div className={styles.filterContainer}>
          <div className={joinClasses(styles.bar, styles.searchBarContainer)}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
                display={"flex"}
                alignItems={"center"}
                height={"100%"}
              />
              <Input variant={"search"}
                placeholder={"Search..."}
                value={searchQuery ?? ''}
                defaultValue={undefined}
                onChange={handleSearchChanged} />

            </InputGroup>
            <ReviewerFilters filters={filters} setFilters={filterReviewers} defaultFilters={defaultFilters} teams={getUniqueTeams()} />
          </div>
          <Box className={styles.searchResult} __css={primaryComponent}>
            {getReviewers()}
          </Box>
        </div>
      </div>
    </PageWrapper>
  );
};
