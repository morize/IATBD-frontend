import React, { useState } from 'react';

import BaseInput, { IBaseInput } from './BaseInput';
import { UploadIcon } from '../../Utils/Icons';

export default {
    component: BaseInput,
    title: 'Input/BaseInput',
};

export const BaseInputStory = (args: IBaseInput) => {
    const [value, setValue] = useState('');

    return <BaseInput value={value} icon={<UploadIcon />} onChange={(e) => setValue(e.target.value)} {...args} />;
};

const args = {
    placeholder: 'Placeholder text',
    label: 'Label:',
};

BaseInputStory.args = args;
