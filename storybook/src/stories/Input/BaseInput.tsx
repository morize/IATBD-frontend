import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-family: 'Fira Sans', sans-serif;
    font-weight: 600;
    font-size: 12px;
    color: #494949;
`;

const StInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 8px;
    border: 1px solid #b3b3c2;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'Fira Sans', sans-serif;
    font-size: 12px;
    color: #494949;
    outline: none;

    &::placeholder {
        color: #b3b3c2;
    }
`;

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const BaseInput = ({ label, ...rest }: IBaseInput) => {
    const labelJsx = label && <StLabel>{label}</StLabel>;

    return (
        <>
            {labelJsx}
            <StInput {...rest} />
        </>
    );
};

export default BaseInput;
