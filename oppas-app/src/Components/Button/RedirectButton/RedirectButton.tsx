import React, { ReactNode } from "react";
import styled from "styled-components";

import BaseButton, { IBaseButton } from "../BaseButton";
import { ForwardIcon } from "../../../Utils/Icons";
import Variants from "../../../Utils/Variants";

export interface IRedirectButton
  extends Omit<IBaseButton, "label" | "variant"> {
  icon: ReactNode;
}

const StRedirectButton = styled(BaseButton)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  border-radius: 0;
  background: ${Variants.primary};
  font-size: 14px;
  word-wrap: break-word;
`;

const RedirectButton = ({ value, ...rest }: IRedirectButton) => (
  <StRedirectButton endIcon={<ForwardIcon />} value={value} {...rest} />
);

export default RedirectButton;
