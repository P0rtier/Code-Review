import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useStyleConfig,
} from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { useLocation } from "react-router";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { ReviewInfo } from "../../components/review-info/ReviewInfo";
import styles from "./ReviewerChoice.module.scss";
import { joinClasses } from "../../common/utils/joinClasses";
import { SortIcon } from "../../assets/icons/SortIcon";
import { SearchIcon } from "@chakra-ui/icons";

export const ReviewerChoice = () => {
  const primaryOrangeComponent = useStyleConfig(
    StyledComponents.PrimaryOrangeComponent
  );

  const location = useLocation();
  const review = location.state.review;

  return (
    <PageWrapper smallGap={true}>
      <div className={styles.container}>
        <div className={styles.reviewContainer}>
          <ReviewInfo
            header={review.header}
            scheduledTo={review.scheduledTo}
            scheduled={String(review.scheduled)}
            team={review.team}
            pullRequest={review.pullRequest}
            description={review.description}
            style={primaryOrangeComponent}
          />
        </div>
        <div className={styles.filterContainer}>
          <div className={joinClasses(styles.bar, styles.filterBar)}>
            <div className={styles.filterTitle}>
              <SortIcon />
              Sort by: ...
            </div>
          </div>
          <div className={joinClasses(styles.bar, styles.searchBarContainer)}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
                display={"flex"}
                alignItems={"center"}
                height={"100%"}
              />
              <Input variant={"search"} placeholder={"Search..."} />
            </InputGroup>
            <Button variant={"search"}>Search</Button>
          </div>
          <div className={styles.searchResult}></div>
        </div>
      </div>
    </PageWrapper>
  );
};
