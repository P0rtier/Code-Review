import React, { useState } from 'react';
import styles from "./ReviewerFilters.module.scss";
import { Range, RangeKeyDict } from 'react-date-range';
import {
    useDisclosure, Button, Divider,
    Drawer, DrawerOverlay, DrawerContent,
    DrawerCloseButton, DrawerHeader, DrawerBody,
    DrawerFooter, NumberDecrementStepper,
    NumberIncrementStepper, NumberInput,
    NumberInputField, NumberInputStepper,
    FormControl, FormLabel, Switch,
    Select, Tooltip
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { KebabIcon } from '../../../../assets/icons/KebabIcon';
import { addDays } from 'date-fns';
import { StyledDateRangePicker } from '../../../../components/date-range-picker/StyledDateRangePicker';
import { IReviewerFiltersProps } from './IReviewerFiltersProps';
import { IReviewerFilters } from "../../../../common/interfaces/IReviewerFilters";

export const ReviewerFilters = (props: IReviewerFiltersProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    //#region variables
    const [filters, setFilters] = useState<IReviewerFilters>({ ...props.filters });

    const maxDaysAfterToday: number = 60;
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: addDays(new Date(), -6),
            endDate: new Date(),
            key: 'date-selection'
        }
    ]);
    //#endregion

    //#region handles
    const toggleSortDir = () => setFilters({ ...filters, isAscending: !filters.isAscending });

    const handleIsUnavailableShownChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, isUnavailableShown: e.target.checked });

    const handleMaxReviewsChange = (_: string, value: number) => setFilters({ ...filters, maxReviews: value });

    const handleSelectedTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, selectedTeam: e.target.value });

    const handleDateRangeChange = (item: RangeKeyDict) => {
        let newDateRange: Range = item[dateRange[0].key ?? ''];
        let newStartDate: Date | undefined = newDateRange.startDate
        let newEndDate: Date | undefined = newDateRange.endDate

        if (newStartDate === undefined || newStartDate < new Date()) {
            newStartDate = new Date()
        }
        if (newEndDate === undefined || newEndDate > addDays(new Date(), maxDaysAfterToday)) {
            newEndDate = addDays(new Date(), maxDaysAfterToday)
        }
        if (newEndDate < newStartDate) {
            newEndDate = newStartDate
        }

        newDateRange = { ...newDateRange, startDate: newStartDate, endDate: newEndDate } as Range
        setDateRange([newDateRange]);
        setFilters({ ...filters, startDate: newStartDate, endDate: newEndDate })
    }
    //#endregion

    //#region functions
    const getTeamsSelect = () => {
        return (
            <Select placeholder='Select a team'
                value={filters.selectedTeam}
                onChange={handleSelectedTeamChange}>
                {props.teams
                    .map((team, key) => (
                        <option key={key} value={team}>{team}</option>
                    ))
                }
            </Select>
        );
    }

    const clearFilters = () => {
        setFilters(props.defaultFilters);
        setDateRange([{ ...dateRange[0], startDate: props.defaultFilters.startDate, endDate: props.defaultFilters.endDate }]);
    }

    const applyFilters = () => {
        props.setFilters(filters)

        onClose();
    }

    const onOpenClick = () => {
        setFilters(props.filters);
        setDateRange([{ ...dateRange[0], startDate: props.filters.startDate, endDate: props.filters.endDate }]);

        onOpen();
    }
    //#endregion

    const sortButton =
        filters.isAscending ?
            <div className={styles.sortButton}>
                <p>Sort ascending</p> <TriangleUpIcon />
            </div>
            :
            <div className={styles.sortButton}>
                <p>Sort descending</p> <TriangleDownIcon />
            </div>;

    return (
        <>
            <Tooltip hasArrow label="Filters">
                <Button onClick={onOpenClick} variant={"search"} className={styles.filterButton}>
                    <KebabIcon />
                </Button>
            </Tooltip>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent w={'20vw'}>
                    {/* <DrawerContent maxW={"fit-content"}> */}
                    <DrawerCloseButton />
                    <DrawerHeader>Filters</DrawerHeader>

                    <DrawerBody>
                        <div className={styles.bodyContainer}>

                            <Button variant="ghost"
                                onClick={toggleSortDir}>

                                {sortButton}
                            </Button>
                            <Divider />
                            <div>
                                <label>Max. scheduled reviews</label>
                                <NumberInput min={0}
                                    precision={0}
                                    allowMouseWheel
                                    value={filters.maxReviews ?? ''}
                                    defaultValue={undefined}
                                    onChange={handleMaxReviewsChange} >

                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </div>
                            {getTeamsSelect()}
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='show-unavailable' mb='0'>
                                    Show unavailable users
                                </FormLabel>
                                <Switch id='show-unavailable'
                                    isChecked={filters.isUnavailableShown}
                                    onChange={handleIsUnavailableShownChange} />
                            </FormControl>

                            {/* <StyledDateRangePicker
                                editableDateInputs={true}
                                minDate={new Date()}
                                maxDate={addDays(new Date(), maxDaysAfterToday)}
                                onChange={handleDateRangeChange}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                            /> */}
                        </div>
                    </DrawerBody>

                    <DrawerFooter>
                        <div className={styles.footerContainer}>
                            <Button variant="search" className={styles.saveButton}
                                onClick={applyFilters}>

                                Save
                            </Button>
                            <Button variant='outline' className={styles.clearButton}
                                onClick={clearFilters}>

                                Clear
                            </Button>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};