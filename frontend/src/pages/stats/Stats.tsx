import * as React from "react";
import styles from "./Stats.module.scss";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { SortIcon } from "../../assets/icons/SortIcon";
import { joinClasses } from "../../common/utils/joinClasses";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useStyleConfig,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { StyledComponents } from "../../common/enums/StyledComponents";

export const Stats = () => {
  const filterBarStyles = useStyleConfig(StyledComponents.FilterBar);

  return (
    <PageWrapper smallGap={true}>
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
    </PageWrapper>
  );
};
