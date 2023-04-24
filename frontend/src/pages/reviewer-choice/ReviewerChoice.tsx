import React from "react";
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

export const ReviewerChoice = () => {
  const primaryOrangeComponent = useStyleConfig(
    StyledComponents.PrimaryOrangeComponent
  );
  const filterBarStyles = useStyleConfig(StyledComponents.FilterBar);
  const primaryComponent = useStyleConfig(StyledComponents.PrimaryComponent);

  const location = useLocation();
  const review = location.state.review;

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
          <Box
            className={joinClasses(styles.bar, styles.filterBar)}
            __css={filterBarStyles}
          >
            <div className={styles.filterTitle}>
              <SortIcon />
              Sort by: ...
            </div>
          </Box>
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
          <Box className={styles.searchResult} __css={primaryComponent}></Box>
        </div>
      </div>
    </PageWrapper>
  );
};
