interface IVariants {
  primary: string;
  secondary: string;
  danger: string;
  card: string;
  default: string;
  info: string;
}

export type TVariants =
  | "primary"
  | "secondary"
  | "danger"
  | "card"
  | "info"
  | "default";

const Variants: IVariants = {
  primary: "#4A5E87",
  secondary: "#35823D",
  info: "#536ABA",
  danger: "#D11717",
  card: "#208F96",
  default: "#494949",
};

export default Variants;
