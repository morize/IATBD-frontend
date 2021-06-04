import { InputHTMLAttributes } from "react";
import styled from "styled-components";

import { StLabel } from "../../Utils/HTMLComponents";
import Variants from "../../Utils/Variants";

const StTextAreaLabel = styled(StLabel)`
  margin-bottom: 2%;
`;

const StTextArea = styled.textarea`
  height: clamp(80px, 14vh, 200px);
  max-height: 300px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 24px;
  padding: 8px;
  border: 1px solid #b3b3c2;
  border-radius: 6px;
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
