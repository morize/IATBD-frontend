import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import Variants, { TVariants } from "../../Utils/Variants";

const StButton = styled.button<{ variant: TVariants }>`
  width: 100%;
  height: 4rem;
  border: none;
  border-radius: 8px;
  background: ${(props) => Variants[props.variant]};
  font-family: "Fira Sans", sans-serif;
  font-size: 1rem;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;

const StEndIcon = styled.div`
  position: absolute;
  width: 50px;
  right: 10px;
`;

export interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: TVariants;
}

const BaseButton = ({
  label,
  startIcon,
  endIcon,
  variant = "primary",
  ...rest
}: IBaseButton) => {
  const labelText = label ? label : "Press me!";
  const startIconJsx = startIcon && startIcon;
  const endIconJsx = endIcon && <StEndIcon>{endIcon}</StEndIcon>;
  return (
    <StButton variant={variant} {...rest}>
      {labelText} {startIconJsx} {endIconJsx}
    </StButton>
  );
};

export default BaseButton;
