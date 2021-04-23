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
  secondary: "#02613F",
  info: "#536ABA",
  danger: "#973552",
  card: "#208F96",
  default: "#494949",
};

export default Variants;
