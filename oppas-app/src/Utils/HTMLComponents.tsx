import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  margin: 0 0 24px 0;
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
  color: ${Variants.primary};
`;

export const StSection = styled.section`
  margin: 24px 0;

  &:last-child {
    margin: 24px 0 0 0;
  }
`;

export const StArticle = styled.article`
  display: flex;
  flex-direction: column;
  width: 840px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    width: 700px;
  }

  // Workaround for padding-bottom bug while a container is inside an overflow auto parent.
  &:after {
    content: "";
    min-height: 120px;
  }
`;

export const StSubArticle = styled(StArticle)`
  margin: 0 auto;
  max-width: 800px;
`;

export const StForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;

  & div {
    user-select: none;
  }
`;

const StProgressContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoadingComponent = () => (
  <StProgressContainer>
    <CircularProgress />
  </StProgressContainer>
);
