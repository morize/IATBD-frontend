import React from 'react';
import styled from 'styled-components';

import IconButton, { IIconButton } from './IconButton';
import { HomeIcon, UserIcon, PetIcon } from '../../../Utils/Icons';

export default {
    component: IconButton,
    title: 'Button/IconButton',
};

export const IconButtonItem = (args: IIconButton) => {
    const StDiv = styled.div`
        & button {
            margin-right: 8px;
        }
    `;

    const onButtonPressed = (e) => {
        console.log(e.target.value);
    };

    return (
        <StDiv>
            <IconButton icon={<HomeIcon />} value="Home" onClick={onButtonPressed} />
            <IconButton icon={<UserIcon />} value="User" onClick={onButtonPressed} />
            <IconButton icon={<PetIcon />} value="Pet" onClick={onButtonPressed} />
        </StDiv>
    );
};
