import styled from "styled-components";
import Select from "react-select";

const StSelect = styled(Select)`
  min-width: 12rem;

  & .react-select__control {
    background: #be8b4e;
    padding: 0.4rem;
    cursor: pointer;
    border: none;
    box-shadow: none !important;
  }

  & .react-select__placeholder,
  & .react-select__single-value {
    color: #ffff;
  }

  & .react-select__indicator {
    color: #ffff;

    &:hover {
      color: #bababa;
    }
  }
`;

interface ISelectButton {
  options: { value: string; label: string }[];
  placeholder: string;
}

const SelectButton = ({ options, placeholder }: ISelectButton) => (
  <StSelect
    placeholder={placeholder}
    options={options}
    classNamePrefix="react-select"
  />
);

export default SelectButton;
