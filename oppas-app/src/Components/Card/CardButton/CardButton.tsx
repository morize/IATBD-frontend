import styled from "styled-components";

import { IBaseButton } from "../../Button/BaseButton";
import Variants from "../../../Utils/Variants";

export interface ICardButton extends Omit<IBaseButton, "label" | "variant"> {
  src: string;
  buttonText: string;
  alt?: string;
}

const StImg = styled.img`
  display: block;
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const StFigCaption = styled.figcaption`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  border-radius: 0 0 5px 5px;
  background: ${Variants.tertiary};
  color: #ffff;
`;

const StEmptyButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  font-family: "Fira Sans", sans-serif;
  user-select: none;
`;

const CardButton = ({ src, alt, buttonText, value, ...rest }: ICardButton) => (
  <StEmptyButton {...rest}>
    <StImg alt={alt} src={src}></StImg>
    <StFigCaption>{buttonText}</StFigCaption>
  </StEmptyButton>
);

export default CardButton;
