import styled from "styled-components";
import Select from "react-select";

import Variants from "../../../Utils/Variants";

const StSelect = styled(Select)`
  min-width: 12rem;

  & .react-select__control {
    background: #be8b4e;
    padding: 0.4rem;
    cursor: pointer;
    border: none;
    text-align: center;
    align-items: center;
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

const StInputSelect = styled(Select)`
  min-width: 100%;

  & .react-select__control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;

    border: 1px solid #b3b3c2;
    border-radius: 5px;
    box-sizing: border-box;
    background: #ffff;
    cursor: pointer;
    box-shadow: none;

    & div {
      margin: 0;
      width: auto;
    }
  }

  & .react-select__placeholder,
  & .react-select__single-value {
  }

  & .react-select__indicator {
    color: #ffff;

    &:hover {
      color: #bababa;
    }
  }

  & .react-select__value-container {
  }

  & .react-select__menu {
    position: absolute;
    width: 100%;
    z-index:3;

    & div {
      margin: 0;
      width: 100%;
    }
    
    & .option:hover {
      background: black;
    }
  }
`;

const StLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: ${Variants.primary};
  user-select: none;
`;

interface ISelectButton {
  options: { value: string; label: string }[];
  value?: { value: string; label: string };
  onChange: (value: { value: string; label: string }) => void;
  variant: "filter" | "input";
  labelForInput?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

const SelectButton = ({
  options,
  value,
  onChange,
  variant,
  labelForInput,
  placeholder,
  isDisabled,
}: ISelectButton) =>
  variant === "filter" ? (
    <StSelect
      value={value}
      options={options}
      onChange={onChange}
      classNamePrefix="react-select"
      isSearchable={false}
      variant={variant}
      isDisabled={isDisabled}
    />
  ) : (
    <div>
      <StLabel>{labelForInput}</StLabel>
      <StInputSelect
        value={value}
        options={options}
        onChange={onChange}
        classNamePrefix="react-select"
        isSearchable={false}
        variant={variant}
        placeholder={placeholder}
        isDisabled={isDisabled}
      />
    </div>
  );

export default SelectButton;
