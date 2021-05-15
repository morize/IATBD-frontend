import styled from "styled-components";
import Select from "react-select";

const StSelect = styled(Select)`
  min-width: 12rem;

  & .react-select__control {
    background: #be8b4e;
    padding: 0.4rem;
    cursor: pointer;
    border: none;
    text-align: center;
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

  & .react-select__value-container {
    justify-content: center;
  }

  & .react-select__menu {
    text-align: center;
    background: #be8b4e;
    color: #ffff;

    & .option:hover {
      background: black;
    }
  }
`;

interface ISelectButton {
  options: { value: string; label: string }[];
  value: { value: string; label: string };
  onChange: (value: { value: string; label: string }) => void;
}

const SelectButton = ({ options, value, onChange }: ISelectButton) => (
  <StSelect
    value={value}
    options={options}
    onChange={onChange}
    classNamePrefix="react-select"
    isSearchable={false}
  />
);

export default SelectButton;
