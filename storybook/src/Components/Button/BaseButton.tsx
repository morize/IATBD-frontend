import React, { ButtonHTMLAttributes, ReactNode } from 'react';
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
    label?: string;
    icon?: ReactNode;
    variant?: TVariants;
}

const BaseButton = ({ label, icon, variant = 'primary', ...rest }: IBaseButton) => {
    const labelText = label !== '' ? label : 'Press me!';
    const iconJsx = icon && icon;
    return (
        <StButton variant={variant} {...rest}>
            {labelText} {iconJsx}
        </StButton>
    );
};

export default BaseButton;
