import { useColorMode } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DateRangePickerStyleOverride.scss";
import styles from "./StyledDatePicker.module.scss";
import { DateRange } from "react-date-range";
import React, { useEffect } from "react";
import { getComponentColorAttention } from "../../common/utils/helpers";
import { IStyledDatePickerProps } from "./IStyledDatePickerProps";

export const StyledDatePicker = (props: IStyledDatePickerProps) => {
  const { colorMode } = useColorMode();
  const attentionColor = getComponentColorAttention(colorMode);

  const [pickedDate, setPickedDate] = React.useState<
    {
      startDate?: Date | undefined;
      endDate?: Date | undefined;
      key?: string | undefined;
    }[]
  >([
    {
      startDate: new Date(Date.now() - 3600 * 1000 * 24),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (pickedDate) {
      props.setCurrentDate({
        startDate: pickedDate[0].startDate as Date,
        endDate: pickedDate[0].endDate as Date,
      });
    }
  }, [pickedDate]);

  return (
    <div className={styles.container}>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setPickedDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={pickedDate}
        rangeColors={[attentionColor, attentionColor, attentionColor]}
        maxDate={new Date()}
        className={styles.font}
      />
    </div>
  );
};
