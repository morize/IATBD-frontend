import React, { InputHTMLAttributes } from 'react';

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {}

const BaseInput = (args: IBaseInput) => (
    <div>
        <label>hi</label>
        <input {...args} />
    </div>
);

export default BaseInput;
