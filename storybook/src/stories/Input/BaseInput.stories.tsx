import React from 'react';

import BaseInput, { IBaseInput } from './BaseInput';

export default {
    component: BaseInput,
    title: 'Input/BaseInput',
};

export const BaseInputStory = (args: IBaseInput) => <BaseInput {...args} />;

const args = {
    placeholder: 'Placeholder text',
    disabled: false,
};

BaseInputStory.args = args;
