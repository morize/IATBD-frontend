import React from 'react';
import styled from 'styled-components';

import BottomButton, { IBottomButton } from './BottomButton';

export default {
    component: BottomButton,
    title: 'Button/Bottom Button',
};

export const BottomButtonItem = (args: IBottomButton) => {
    return <BottomButton {...args} />;
};

const args = {
    label: 'Click here to navigate!',
};

BottomButtonItem.args = args;
