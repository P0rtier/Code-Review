import * as React from "react";
import styles from "./Stats.module.scss";
import { PageWrapper } from "../../components/page-wrapper/PageWrapper";
import { SortIcon } from "../../assets/icons/SortIcon";
import { joinClasses } from "../../common/utils/joinClasses";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const Stats = () => {
  return (
    <PageWrapper smallGap={true}>
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
    </PageWrapper>
  );
};
