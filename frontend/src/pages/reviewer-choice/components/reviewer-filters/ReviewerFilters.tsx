import React, { useState } from "react";
import styles from "./ReviewerFilters.module.scss";
import {
  useDisclosure,
  Button,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { IReviewerFiltersProps } from "./IReviewerFiltersProps";
import { IReviewerFilters } from "../../../../common/interfaces/IReviewerFilters";
import { FilterIcon } from "../../../../assets/icons/FilterIcon";

export const ReviewerFilters = (props: IReviewerFiltersProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState<IReviewerFilters>({
    ...props.filters,
  });

  const toggleSortDir = () =>
    setFilters({ ...filters, isAscending: !filters.isAscending });

  const handleIsUnavailableShownChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setFilters({ ...filters, isUnavailableShown: e.target.checked });

  const handleMaxReviewsChange = (_: string, value: number) =>
    setFilters({ ...filters, maxReviews: value });

  const handleSelectedTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters({ ...filters, selectedTeam: e.target.value });

  const getTeamsSelect = () => {
    return (
      <Select
        placeholder="Select a team"
        value={filters.selectedTeam}
        onChange={handleSelectedTeamChange}
      >
        {props.teams.map((team, key) => (
          <option key={key} value={team}>
            {team}
          </option>
        ))}
      </Select>
    );
  };

  const clearFilters = () => {
    setFilters(props.defaultFilters);
  };

  const applyFilters = () => {
    props.setFilters(filters);

    onClose();
  };

  const onOpenClick = () => {
    setFilters(props.filters);

    onOpen();
  };

  const sortButton = filters.isAscending ? (
    <div className={styles.sortButton}>
      <p>Sort ascending</p> <TriangleUpIcon />
    </div>
  ) : (
    <div className={styles.sortButton}>
      <p>Sort descending</p> <TriangleDownIcon />
    </div>
  );

  return (
    <>
      <Tooltip hasArrow label="Filters">
        <Button
          onClick={onOpenClick}
          variant={"search"}
          className={styles.filterButton}
        >
          <FilterIcon />
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent w={"20vw"}>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            <div className={styles.bodyContainer}>
              <Button variant="ghost" onClick={toggleSortDir}>
                {sortButton}
              </Button>
              <Divider />
              <div>
                <label>Max. scheduled reviews</label>
                <NumberInput
                  min={0}
                  precision={0}
                  allowMouseWheel
                  value={filters.maxReviews ?? ""}
                  defaultValue={undefined}
                  onChange={handleMaxReviewsChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              {getTeamsSelect()}
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="show-unavailable" mb="0">
                  Show unavailable users
                </FormLabel>
                <Switch
                  id="show-unavailable"
                  isChecked={filters.isUnavailableShown}
                  onChange={handleIsUnavailableShownChange}
                />
              </FormControl>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <div className={styles.footerContainer}>
              <Button
                variant="search"
                className={styles.saveButton}
                onClick={applyFilters}
              >
                Save
              </Button>
              <Button
                variant="outline"
                className={styles.clearButton}
                onClick={clearFilters}
              >
                Clear
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
