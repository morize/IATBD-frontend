import { InputHTMLAttributes } from "react";
import styled from "styled-components";

import Variants from "../../Utils/Variants";

const StTextAreaLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: ${Variants.primary};
`;

const StTextArea = styled.textarea`
  height: 130px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 24px;
  padding: 8px;
  border: 1px solid #b3b3c2;
  border-radius: 5px;
  font-family: "Fira Sans", sans-serif;
  color: ${Variants.default};
  box-sizing: border-box;
  outline: none;
`;

interface ITextArea extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = ({ label, ...rest }: ITextArea) => (
  <>
    {label && <StTextAreaLabel>{label}</StTextAreaLabel>}
    <StTextArea {...rest} />
  </>
);
export default TextArea;
