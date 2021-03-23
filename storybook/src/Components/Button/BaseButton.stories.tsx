import React from 'react';

import BaseButton, { IBaseButton } from './BaseButton';

export default {
    component: BaseButton,
    title: 'Button/BaseButton',
};

export const BaseButtonItem = (args: IBaseButton) => {
    return <BaseButton variant={args.variant} {...args} />;
};

const args = {
    label: 'Bestanden Uploaden',
    value: 'Button Value',
};

const argTypes = {
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'danger', 'card'] } },
};

BaseButtonItem.argTypes = argTypes;
BaseButtonItem.args = args;
