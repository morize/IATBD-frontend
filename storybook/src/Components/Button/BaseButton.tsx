import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import Variants, { TVariants } from '../../Utils/Variants';

const StButton = styled.button<{ variant: TVariants }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    background: ${(props) => Variants[props.variant]};
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-family: 'Fira Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #ffffff;
    outline: 0;
`;

export interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant: TVariants;
}

const BaseButton = ({ label, variant = 'primary', ...rest }: IBaseButton) => (
    <StButton variant={variant} {...rest}>
        {label}
    </StButton>
);

export default BaseButton;
