import React from 'react';
import styled from 'styled-components';

import CardButton, { ICardButton } from './CardButton';

export default {
    component: CardButton,
    title: 'Card/Card Button',
};

const StlDiv = styled.div`
    width: 600px;
    margin: 0 auto;
    & div {
        margin-bottom: 30px;
    }
    @media only screen and (max-width: 600px) {
        width: 250px;
    }
`;

export const CardButtonItem = (args: ICardButton) => (
    <StlDiv>
        <CardButton {...args} />
        <CardButton {...args} />
        <CardButton {...args} />
    </StlDiv>
);

const args = {
    label: 'Take a look at our dogs!',
};

CardButtonItem.args = args;
