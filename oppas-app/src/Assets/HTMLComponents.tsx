import styled from "styled-components";

import Variants, { TVariants } from "./Variants";

export const StH1 = styled.h1`
  margin: 0 0 32px 0;
  font-size: 44px;
  color: ${Variants.default};
`;

export const StH2 = styled.h2`
  margin: 16px 0;
  font-size: 34px;
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
  margin-bottom: 84px;
`;

export const StArticle = styled.article`
  width: 800px;
  margin: 0 auto;
`;
