import styled from "styled-components";
import { Switch as MuiSwitch } from "@material-ui/core";
import { SwitchProps } from "@material-ui/core/Switch";

import Variants from "../../Utils/Variants";

const StContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSwitch = styled(MuiSwitch)`
  &.MuiSwitch-root {
    margin: 0 0 0 14px;

    & .MuiSwitch-switchBase {
      color: #ffffff;

      &:hover {
        background-color: rgba(229, 229, 234, 0.5);
      }

      &.Mui-checked {
        color: ${Variants.success};

        &:hover {
          background-color: rgba(73, 170, 110, 0.5);
        }

        & + .MuiSwitch-track {
          background-color: ${Variants.success};
        }
      }

      &.Mui-disabled {
        color: #f5f5f8;

        & + .MuiSwitch-track {
          background-color: #b3b3c2 !important;
        }
      }
    }
  }
`;

const StyledSwitchLabel = styled.label<{ disabled?: boolean }>`
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 18px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  color: ${({ disabled }) => (disabled ? "#b3b3c2" : Variants.primary)};
`;

export interface ISwitch extends SwitchProps {
  label?: string;
}

const Switch = ({ label, disabled, ...rest }: ISwitch) => (
  <StContainer>
    {label && (
      <StyledSwitchLabel disabled={disabled}>{label}</StyledSwitchLabel>
    )}
    <StyledSwitch size="medium" disabled={disabled} {...rest} />
  </StContainer>
);

export default Switch;
