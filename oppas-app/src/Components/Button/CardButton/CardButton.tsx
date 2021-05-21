import styled from "styled-components";

import { IBaseButton } from "../../Button/BaseButton";
import Variants from "../../../Utils/Variants";

const StCardImg = styled.img`
  display: block;
  width: 100%;
  height: 80%;

  border-radius: 8px 8px 0 0;
  object-fit: cover;
`;

const StCardFigcaption = styled.figcaption`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;

  border-radius: 0 0 8px 8px;
  background: ${Variants.tertiary};
  color: #ffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const StCardButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  font-family: "Fira Sans", sans-serif;
  cursor: pointer;
  user-select: none;
`;

export interface ICardButton extends Omit<IBaseButton, "label" | "variant"> {
  src: string;
  buttonText: string;
  alt?: string;
}

const CardButton = ({ src, alt, buttonText, ...rest }: ICardButton) => (
  <StCardButton {...rest}>
    <StCardImg alt={alt} src={src}></StCardImg>
    <StCardFigcaption>{buttonText}</StCardFigcaption>
  </StCardButton>
);

export default CardButton;
