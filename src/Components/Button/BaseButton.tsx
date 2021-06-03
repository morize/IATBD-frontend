import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import Variants, { TVariants } from "../../Utils/Variants";

const StButton = styled.button<{ variant: TVariants }>`
  width: 100%;
  height: clamp(30px, 8vh, 60px);
  border: none;
  border-radius: 8px;
  background: ${(props) => Variants[props.variant]};
  font-family: "Fira Sans", sans-serif;
  font-size: clamp(0.9rem, 4vw, 1.1rem);
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
