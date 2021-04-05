import React from 'react';
import styled from 'styled-components';

import RedirectButton, { IRedirectButton } from './RedirectButton';

export default {
    component: RedirectButton,
    title: 'Button/Redirect Button',
};

const StSec = styled.section`
    position: relative;
    width: 100%;
    height: 1500px;
`;

const StSubSec = styled.section`
    & p {
        margin: 4px 0;
    }
`;

export const RedirectButtonItem = (args: IRedirectButton) => (
    <StSec>
        <RedirectButton {...args} />
    </StSec>
);

const args = {
    label: (
        <StSubSec>
            <p>Op zoek naar opassers?</p>
            <p>Switch naar opassers overzicht.</p>
        </StSubSec>
    ),
};

RedirectButtonItem.args = args;
