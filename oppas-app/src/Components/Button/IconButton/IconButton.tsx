import React, { ReactNode } from "react";
import styled from "styled-components";

import BaseButton, { IBaseButton } from "../BaseButton";
import Variants from "../../../Assets/Variants";

export interface IIconButton extends Omit<IBaseButton, "label" | "variant"> {
  icon: ReactNode;
}

const StIconButton = styled(BaseButton)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${Variants.primary};

  &:focus {
    background: #8ea4cf;
    cursor: auto;
  }

  & svg {
    pointer-events: none;
  }
`;

const IconButton = ({ value, ...rest }: IIconButton) => (
  <StIconButton value={value} {...rest} />
);

export default IconButton;
