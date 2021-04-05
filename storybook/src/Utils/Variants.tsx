interface IVariants {
    primary: string;
    secondary: string;
    danger: string;
    card: string;
}

export type TVariants = 'primary' | 'secondary' | 'danger' | 'card';

const Variants: IVariants = {
    primary: '#4A5E87',
    secondary: '#02613F',
    danger: '#973552',
    card: '#208F96',
};

export default Variants;
