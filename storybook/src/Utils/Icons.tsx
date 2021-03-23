import React from 'react';
import { SvgIcon } from '@material-ui/core';

interface IconProps {
    className?: string;
}

export const UploadIcon = (props: IconProps) => (
    <SvgIcon className={props.className}>
        <path d="M5 4V6H19V4H5ZM5 14H9V20H15V14H19L12 7L5 14Z" />
    </SvgIcon>
);
