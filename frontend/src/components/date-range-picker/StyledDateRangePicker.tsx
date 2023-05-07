import { useColorMode } from "@chakra-ui/react";
import { DateRangePicker, DateRangePickerProps } from "react-date-range";
import { getComponentColorOrange } from "../../common/utils/helpers";
import "./DateRangePicker.css";

export const StyledDateRangePicker = (props: DateRangePickerProps) => {
  const { colorMode } = useColorMode();
  const rangeColor = getComponentColorOrange(colorMode);
  return (
    <DateRangePicker {...props} rangeColors={[rangeColor]} color={rangeColor} />
  );
};
