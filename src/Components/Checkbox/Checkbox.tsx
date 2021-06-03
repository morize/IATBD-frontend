import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox as MuiCheckbox } from "@material-ui/core";
import { CheckboxProps } from "@material-ui/core/Checkbox";

import Variants from "../../Utils/Variants";

const StCheckbox = styled(MuiCheckbox)`
  &.MuiButtonBase-root {
    padding: 8px;
  }

  &.Mui-disabled:not(.Mui-checked) rect {
    stroke: #b3b3c2;
  }

  &.Mui-checked.Mui-disabled rect {
    stroke: #b3b3c2;
    fill: #b3b3c2;
  }

  &.MuiCheckbox-colorSecondary.Mui-checked {
    color: ${Variants.primary};
  }

  @media (hover: hover) {
    &.MuiButtonBase-root:hover {
      background: #f5f5f8 !important;
    }
  }
`;

const StCheckboxContainer = styled(FormControlLabel)<{ margin: string }>`
  &.MuiFormControlLabel-root {
    margin: ${(props) => props.margin};
  }

  & .MuiFormControlLabel-label {
    font-size: clamp(0.9rem, 1.2vw, 1rem);
    font-family: "Fira Sans", sans-serif;
    color: ${({ disabled }) => (disabled ? "#b3b3c2" : Variants.primary)};
  }
`;

export interface ICheckbox
  extends Omit<
    CheckboxProps,
    | "disableRipple"
    | "touchRipple"
    | "centerRipple"
    | "focusRipple"
    | "disableTouchRipple"
    | "disableFocusRipple"
    | "onClick"
  > {
  label?: string;
  value: string;
  margin?: string;
  onClick: (value: string) => void;
}

const Checkbox = ({ label, margin, onClick, value, ...rest }: ICheckbox) => (
  <StCheckboxContainer
    control={
      <StCheckbox
        disableRipple={true}
        value={value}
        onClick={() => onClick(value)}
        {...rest}
      />
    }
    label={label}
    margin={margin ? margin : "0"}
  />
);

export default Checkbox;
