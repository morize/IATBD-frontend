import { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import Variants from "../../Utils/Variants";

const StLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: ${Variants.primary};
`;

const StInput = styled.input`
  width: 100%;
  padding: 0;
  color: #494949;
  border: 0;
  outline: none;
  background: none;

  &::placeholder {
    color: #b3b3c2;
  }
`;

const StInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 8px;
  border: 1px solid #b3b3c2;
  font-size: 16px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #ffff;

  & span {
    color: ${Variants.primary};
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
    <>
      {labelJsx}
      <StInputContainer>
        <StInput {...rest} />
        {iconJsx}
      </StInputContainer>
    </>
  );
};

export default BaseInput;
