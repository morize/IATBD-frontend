import { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import Variants from "../../Utils/Variants";

const StLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: ${Variants.primary};
  user-select: none;
`;

const StInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 8px;
  color: #494949;
  border: 0;
  outline: none;
  background: none;
  font-family: "Fira Sans", sans-serif;
  box-sizing: border-box;
  z-index: 2;

  &::placeholder {
    color: #b3b3c2;
  }
`;

const StInputContainer = styled.div`
  display: flex;
  width: 100% !important;
  position: relative;
  align-items: center;
  height: 50px;
  border: 1px solid #b3b3c2;
  border-radius: 5px;
  box-sizing: border-box;
  background: #ffff;
  user-select: none;

  & span {
    margin-right: 8px;
    color: ${Variants.primary};

    & svg {
      width: 1.25em;
      height: 1.25em;
    }
  }

  & input[type="file"] {
    line-height: 30px;
    cursor: pointer;
  }

  & input[type="file"] + span {
    position: absolute;
    margin-right: 0;
    right: 8px;
    color: ${Variants.primary};
  }
`;

const InputComponentContainer = styled.div`
  width: 100%;

  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

const BaseInput = ({ label, icon, ...rest }: IBaseInput) => {
  const labelJsx = label && <StLabel>{label}</StLabel>;
  const iconJsx = icon && <span>{icon}</span>;

  return (
    <InputComponentContainer>
      {labelJsx}
      <StInputContainer>
        <StInput {...rest} />
        {iconJsx}
      </StInputContainer>
    </InputComponentContainer>
  );
};

export default BaseInput;
