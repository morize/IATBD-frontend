import React, { useState } from 'react';

import BaseButton, { IBaseButton } from './BaseButton';

export default {
    component: BaseButton,
    title: 'Input/BaseButton',
};

export const BaseButtonStory = (args: IBaseButton) => {
    const [value, setValue] = useState(false);

    return <BaseButton variant={args.variant} onChange={(e) => setValue(!value)} {...args} />;
};

const args = {
    label: 'Bestanden Uploaden',
    value: 'Button Value',
};

const argTypes = {
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'danger', 'card'] } },
};

BaseButtonStory.argTypes = argTypes;
BaseButtonStory.args = args;
