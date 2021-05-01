import styled from "styled-components";
import { Switch as MuiSwitch } from "@material-ui/core";
import { SwitchProps } from "@material-ui/core/Switch";

import Variants from "../../Utils/Variants";

const StyledSwitch = styled(MuiSwitch)`
  & .MuiSwitch-track {
    background-color: #66667c;
    opacity: 1 !important;
  }

  & .MuiSwitch-thumb {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  }

  &.MuiSwitch-root {
    overflow: visible;
    padding-left: 11px;
    margin: 4px 9px 4px 4px;

    & .MuiSwitch-switchBase {
      color: #ffffff;
      padding: 8px !important;
      position: absolute;
      top: -4px;
      left: -5px;

      &:hover {
        background-color: rgba(229, 229, 234, 0.5);
      }

      &.Mui-checked {
        color: #00386b;
        left: 1px;

        &:hover {
          background-color: rgba(25, 76, 122, 0.5);
        }

        & + .MuiSwitch-track {
          background-color: #194c7a;
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
  color: ${({ disabled }) => (disabled ? "#b3b3c2" : Variants.primary)};
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
    <>
      {labelJsx}
      <StyledSwitch size="small" disabled={disabled} {...rest} />
    </>
  );
};

export default Switch;
