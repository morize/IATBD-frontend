import { ReactNode } from "react";
import styled from "styled-components";

import BaseButton, { IBaseButton } from "../BaseButton";

export interface IImgButton extends Omit<IBaseButton, "label" | "variant"> {
  icon: ReactNode;
  src: string;
  active: boolean;
}

const StImgButton = styled(BaseButton)<IImgButton>`
  width: 500px;
  height: 125px;
  border-radius: 8px;
  background: linear-gradient(
      ${(props) =>
        props.active
          ? "rgba(0, 111, 44, 0.3), rgba(0, 111, 44, 0.3)"
          : "rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)"}
    ),
    url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  font-size: 1.4rem;
`;

const ImgButton = ({ value, src, active, ...rest }: IImgButton) => {
  return <StImgButton src={src} active={active} value={value} {...rest} />;
};

export default ImgButton;
