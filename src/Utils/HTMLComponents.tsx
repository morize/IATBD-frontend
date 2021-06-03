import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import Variants, { TVariants } from "./Variants";

export const StH1 = styled.h1`
  margin: 0 0 3.4% 0;
  font-size: 2.2rem;
  color: ${Variants.default};
`;

export const StH2 = styled.h2`
  margin: 1.4% 0 2.8% 0;
  font-size: 1.8rem;
  color: ${Variants.default};
`;

export const StH3 = styled.h3`
  margin: 0 0 2.8% 0;
  font-size: 1.3rem;
  color: ${Variants.default};
`;

interface IStP {
  variant?: TVariants;
  bold?: boolean;
}

export const StP = styled.p<IStP>`
  font-size: 1rem;
  font-weight: ${(props) => (props.bold ? 600 : 500)};
  color: ${(props) => Variants[props.variant!]};
  white-space: pre-wrap;
`;

export const StLabel = styled.label`
  font-size: 1.1rem;
  color: ${Variants.primary};
`;

export const StSection = styled.section`
  margin: 2% 0;

  &:last-child {
    margin: 2% 0 0 0;
  }
`;

export const StArticle = styled.article<{ admin?: boolean }>`
  display: flex;
  flex-direction: column;
  width: clamp(600px, 50%, 800px);
  min-width: ${(props) => (props.admin ? "100%" : "auto")};
  margin: 0 auto;
  overflow: ${(props) => (props.admin ? "auto" : "unset")};
`;

export const StSubArticle = styled(StArticle)`
  width: clamp(400px, 50%, 740px);
  margin: 3.8% auto;
`;

export const StForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;

  & div {
    user-select: none;
  }
`;

export const StErrorMessage = styled.p`
  margin: -2% 0 4.5% 0;
  color: ${Variants.danger};
`;

const StProgressContainer = styled.div`
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
