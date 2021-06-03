import { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import { StLabel } from "../../Utils/HTMLComponents";
import Variants from "../../Utils/Variants";

const StInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 16px 8px;
  border: 0;
  background: none;
  font-family: "Fira Sans", sans-serif;
  color: #494949;
  box-sizing: border-box;
  outline: none;
  z-index: 2;

  &::placeholder {
    color: #b3b3c2;
  }
`;

const StInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #b3b3c2;
  border-radius: 6px;
  background: #ffff;
  box-sizing: border-box;
  user-select: none;

  & span {
    margin-right: 8px;
    color: ${Variants.primary};

    & svg {
      width: 34px;
      height: 34px;
    }
  }

  & input[type="file"] {
    line-height: 30px;
    cursor: pointer;
  }

  & input[type="file"] + span {
    position: absolute;
    right: 8px;
    margin-right: 0;
  }
`;

const InputParent = styled.div`
  margin-bottom: 3%;

  & label {
    margin-bottom: 2%;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    margin-bottom: clamp(6px, 4%, 12px);
  }
`;

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

const BaseInput = ({ label, icon, ...rest }: IBaseInput) => (
  <InputParent>
    {label && <StLabel>{label}</StLabel>}
    <StInputContainer>
      <StInput {...rest} />
      {icon && <span>{icon}</span>}
    </StInputContainer>
  </InputParent>
);

export default BaseInput;
