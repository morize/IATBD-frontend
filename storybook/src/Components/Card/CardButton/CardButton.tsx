import React, { ReactNode } from 'react';
import styled from 'styled-components';

import BaseButton, { IBaseButton } from '../../Button/BaseButton';
import Variants from '../../../Utils/Variants';

export interface ICardButton extends Omit<IBaseButton, 'label' | 'variant'> {
    icon: ReactNode;
}

const StCard = styled.div`
    display: inline-block;
    width: 100%;
    height: 300px;

    @media only screen and (max-width: 600px) {
        height: 200px;
    }
`;

const StFigure = styled.figure`
    width: 100%;
    height: 80%;
    margin: 0;
    padding: 0;
`;

const StImg = styled.img`
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
`;

const StCardButton = styled(BaseButton)`
    height: 20%;
    border-radius: 0 0 5px 5px;
    background: ${Variants.secondary};
    font-size: 16px;
`;

const CardButton = ({ value, ...rest }: ICardButton) => (
    <StCard>
        <StFigure>
            <StImg src={'https://dogtime.com/assets/uploads/2018/10/how-to-get-pet-sitter-job.jpg'}></StImg>
        </StFigure>
        <StCardButton value={value} {...rest} />
    </StCard>
);

export default CardButton;
