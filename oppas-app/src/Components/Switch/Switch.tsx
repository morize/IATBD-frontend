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

const StyledSwitchLabel = styled.p<{ disabled?: boolean }>`
  display: inline-block;
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  color: ${({ disabled }) => (disabled ? "#b3b3c2" : Variants.default)};
`;

export interface ISwitch extends SwitchProps {
  /**
   * Text label next to the switch.
   */
  label?: string;
}

const Switch = ({ label, disabled, ...rest }: ISwitch) => {
  const labelJsx = label ? (
    <StyledSwitchLabel disabled={disabled}>{label}</StyledSwitchLabel>
  ) : null;

  return (
    <StContainer>
      {labelJsx}
      <StyledSwitch size="medium" disabled={disabled} {...rest} />
    </StContainer>
  );
};

export default Switch;
