import React, { ReactNode } from 'react';
import styled from 'styled-components';

import BaseButton, { IBaseButton } from '../BaseButton';
import Variants from '../../../Utils/Variants';

export interface IBottomButton extends Omit<IBaseButton, 'label' | 'variant'> {
    icon: ReactNode;
}

const StBottomButton = styled(BaseButton)`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    border-radius: 0;
    background: ${Variants.primary};
    font-size: 18px;
`;

const BottomButton = ({ value, ...rest }: IBottomButton) => <StBottomButton value={value} {...rest} />;

export default BottomButton;
