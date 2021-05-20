import styled from "styled-components";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import "react-datepicker/dist/react-datepicker.css";

import Variants from "../../Utils/Variants";

const StDatePickerContainer = styled.div`
  position: relative;
  margin-bottom: 24px;

  & .react-datepicker-wrapper {
    height: 50px;
    width: 100%;

    & .react-datepicker__input-container {
      height: 100%;

      & input {
        width: 100%;
        height: 100%;
        padding: 8px;
        border: 1px solid #b3b3c2;
        border-radius: 5px;
        background: #ffff;
        color: ${Variants.default};
        cursor: pointer;
        outline: none;
        box-sizing: border-box;
      }
    }
  }

  & .react-datepicker-popper {
    z-index: 2;
  }

  & svg {
    position: absolute;
    top: 52%;
    transform: translateY(-50%, -50%);
    right: 2%;
    color: ${Variants.primary};
  }

  &:last-child {
    margin: 0;
  }
`;

const StDatepickerLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: ${Variants.primary};
  user-select: none;
`;

interface IBaseDatepicker extends ReactDatePickerProps {
  label: string;
  onChange: (date: Date) => void;
}

const BaseDatepicker = ({
  label,
  onChange,
  ...rest
}: IBaseDatepicker) => (
  <StDatePickerContainer>
    <StDatepickerLabel>{label}</StDatepickerLabel>
    <DatePicker onChange={onChange} {...rest} />
    <CalendarTodayIcon />
  </StDatePickerContainer>
);

export default BaseDatepicker;
