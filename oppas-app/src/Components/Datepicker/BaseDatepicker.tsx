import styled from "styled-components";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import "react-datepicker/dist/react-datepicker.css";

import Variants from "../../Utils/Variants";

const StLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: ${Variants.primary};
  user-select: none;
`;

const StDatePicker = styled.div`
  position: relative;
  margin-bottom: 24px;

  &:last-child {
    margin: 0;
  }

  & .react-datepicker-wrapper {
    height: 50px;
    width: 100%;

    & .react-datepicker__input-container {
      height: 100%;

      & input {
        width: 100%;
        height: 100%;
        padding: 8px;
        border: none;
        outline: none;
        background: #ffff;
        color: ${Variants.default};
        border: 1px solid #b3b3c2;
        border-radius: 5px;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
  }

  & .react-datepicker-popper {
    z-index: 3;
  }

  & svg {
    position: absolute;
    top: 52%;
    transform: translateY(-50%, -50%);
    right: 10px;
    color: ${Variants.primary};
  }
`;

interface IBaseDatepicker extends ReactDatePickerProps {
  date?: Date;
  label: string;
  onChange: (date: Date) => void;
  startDate?: Date;
}

const BaseDatepicker = ({
  label,
  onChange,
  startDate,
  ...rest
}: IBaseDatepicker) => (
  <StDatePicker>
    <StLabel>{label}</StLabel>
    <DatePicker
      onChange={onChange}
      startDate={startDate}
      selectsStart
      {...rest}
    />
    <CalendarTodayIcon />
  </StDatePicker>
);

export default BaseDatepicker;
