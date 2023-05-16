import { useColorMode } from "@chakra-ui/react";
import { DateRangePicker, DateRangePickerProps } from "react-date-range";
import { getComponentColorAttention } from "../../common/utils/helpers";
import "./DateRangePicker.css";

export const StyledDateRangePicker = (props: DateRangePickerProps) => {
  const { colorMode } = useColorMode();
  const rangeColor = getComponentColorAttention(colorMode);
  return (
    <DateRangePicker {...props} rangeColors={[rangeColor]} color={rangeColor} />
  );
};
