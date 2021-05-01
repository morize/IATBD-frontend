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
  color: ${Variants.primary};
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
  max-width: 700px;
`;

export const StArticle = styled.article`
  width: 100%;
  margin-top: 40px;
  box-sizing: border-box;
`;

export const StSubArticle = styled(StArticle)`
  display: inline-block;
  width: 50%;
`;

export const StForm = styled.form`
  position: relative;

  & div {
    user-select: none;
    margin-bottom: 24px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;
