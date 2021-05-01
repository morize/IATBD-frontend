import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import Variants, { TVariants } from "../../Utils/Variants";

const StButton = styled.button<{ variant: TVariants }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background: ${(props) => Variants[props.variant]};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: "Fira Sans", sans-serif;
  font-size: 16px;
  color: #ffffff;
  outline: 0;
  user-select: none;
`;

const StEndIcon = styled.div`
  position: absolute;
  width: 50px;
  right: 10px;
`;

export interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | ReactNode;
  icon?: ReactNode;
  endIcon?: ReactNode;
  variant?: TVariants;
}

const BaseButton = ({
  label,
  icon,
  endIcon,
  variant = "primary",
  ...rest
}: IBaseButton) => {
  const labelText = label !== "" ? label : "Press me!";
  const iconJsx = icon && icon;
  const endIconJsx = endIcon && <StEndIcon>{endIcon}</StEndIcon>;
  return (
    <StButton variant={variant} {...rest}>
      {labelText} {iconJsx} {endIconJsx}
    </StButton>
  );
};

export default BaseButton;
