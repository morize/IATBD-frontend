import styled from "styled-components";
import Select from "react-select";

import Variants from "../../Utils/Variants";

const StSelect = styled(Select)`
  width: 100%;
  margin-right: 4%;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 600px) {
    margin-right: 0%;
    margin-bottom: 6%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  & .react-select__control {
    padding: 4% 2%;
    border: none;
    background: #be8b4e;
    text-align: center;
    cursor: pointer;
    box-shadow: none;
  }

  & .react-select__placeholder,
  & .react-select__single-value,
  & .react-select__indicator {
    color: #ffff;
  }

  & .react-select__value-container {
    justify-content: center;
  }

  & .react-select__menu {
    background: #be8b4e;
    text-align: center;
    color: #ffff;
  }
`;

const StInputSelect = styled(Select)`
  min-width: 100%;

  & .react-select__control {
    width: 100%;
    height: 50px;
    border: 1px solid #b3b3c2;
    background: #ffff;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 500;
    box-sizing: border-box;
    cursor: pointer;
    box-shadow: none;

    & div {
      width: auto;
    }
  }

  & .react-select__placeholder,
  & .react-select__single-value,
  & .react-select__indicator {
    color: ${Variants.default};
  }

  & .react-select__menu {
    width: 100%;
    z-index: 3;

    & div {
      width: 100%;
    }
  }
`;

const StSelectLabel = styled.label`
  display: block;
  margin-bottom: 12px;
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

const SelectComponent = (props: ISelectButton) =>
  props.variant === "filter" ? (
    <StSelect
      value={props.value}
      options={props.options}
      onChange={props.onChange}
      classNamePrefix="react-select"
      isSearchable={false}
      variant={props.variant}
      isDisabled={props.isDisabled}
    />
  ) : (
    <div>
      <StSelectLabel>{props.labelForInput}</StSelectLabel>
      <StInputSelect
        value={props.value}
        options={props.options}
        onChange={props.onChange}
        classNamePrefix="react-select"
        isSearchable={false}
        variant={props.variant}
        placeholder={props.placeholder}
        isDisabled={props.isDisabled}
      />
    </div>
  );

export default SelectComponent;
