import React from 'react';
import styled from 'styled-components';

import BottomButton, { IBottomButton } from './BottomButton';

export default {
    component: BottomButton,
    title: 'Button/Bottom Button',
};

export const BottomButtonItem = (args: IBottomButton) => {
    const StDiv = styled.div`
        position: relative;
        width: 100%;
        height: 1500px;
    `;
    return (
        <StDiv>
            <BottomButton {...args} />
        </StDiv>
    );
};

const args = {
    label: 'Click here!',
};

BottomButtonItem.args = args;
