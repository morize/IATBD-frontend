import React, { useState } from 'react';

import BaseInput, { IBaseInput } from './BaseInput';

export default {
    component: BaseInput,
    title: 'Input/BaseInput',
};

export const BaseInputStory = (args: IBaseInput) => {
    const [value, setValue] = useState('');

    return <BaseInput value={value} onChange={(e) => setValue(e.target.value)} {...args} />;
};

const args = {
    placeholder: 'Placeholder text',
    label: 'Label:',
};

BaseInputStory.args = args;
