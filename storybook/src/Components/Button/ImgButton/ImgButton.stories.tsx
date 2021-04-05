import React from 'react';
import styled from 'styled-components';

import ImgButton, { IImgButton } from './ImgButton';

export default {
    component: ImgButton,
    title: 'Button/Img Button',
};

export const ImgButtonItem = (args: IImgButton) => {
    const StDiv = styled.div`
        & button {
            margin-bottom: 30px;
        }
    `;

    return (
        <StDiv>
            <ImgButton src={'https://pbs.twimg.com/media/CyTv5WOWEAASezv.jpg'} {...args} />
            <ImgButton
                src={
                    'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d'
                }
                active={true}
                {...args}
            />
            <ImgButton
                src={'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg'}
                {...args}
            />
        </StDiv>
    );
};

const args = {
    label: 'Dog',
};

const argTypes = {
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'danger', 'card'] } },
};

ImgButtonItem.argTypes = argTypes;
ImgButtonItem.args = args;
