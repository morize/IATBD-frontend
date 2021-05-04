import styled from "styled-components";

import Variants, { TVariants } from "./Variants";

export const StH1 = styled.h1`
  margin: 0 0 32px 0;
  font-size: 44px;
  color: ${Variants.default};
`;

export const StH2 = styled.h2`
  margin: 12px 0 24px 0;
  font-size: 32px;
  color: ${Variants.default};
`;

export const StH3 = styled.h3`
  margin: 32px 0 24px 0;
  font-size: 24px;
  font-weight: 500;
  text-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  color: ${Variants.default};
`;

interface IStP {
  variant?: TVariants;
  bold?: boolean;
}

export const StP = styled.p<IStP>`
  font-size: 16px;
  color: ${(props) => Variants[props.variant!]};
  font-weight: ${(props) => (props.bold ? 600 : 500)};
  white-space: pre-wrap;
`;

export const StLabel = styled.label`
  font-size: 18px;
  color: #494949;
`;

export const StSection = styled.section`
  margin: 0 auto;
`;

export const StArticle = styled.article`
  margin: 0 auto;
  max-width: 700px;
  box-sizing: border-box;
`;

export const StSubArticle = styled(StArticle)`
  display: inline-block;
  width: 100%;
  margin: 0 auto 0 6vw;
`;

export const StForm = styled.form`
  position: relative;

  & div {
    user-select: none;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;
