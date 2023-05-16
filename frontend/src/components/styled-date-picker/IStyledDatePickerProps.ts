import { IDateContainer } from "../../common/interfaces/IDateContainer";

export interface IStyledDatePickerProps {
  setCurrentDate: (dateContainer: IDateContainer) => void;
}
