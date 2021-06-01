interface IVariants {
  primary: string;
  secondary: string;
  tertiary: string;
  danger: string;
  card: string;
  success: string;
  default: string;
  info: string;
}

export type TVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "success"
  | "card"
  | "info"
  | "default";

const Variants: IVariants = {
  primary: "#4A5E87",
  secondary: "#9A2828",
  tertiary: "#235F29",
  info: "#536ABA",
  danger: "#EA2222",
  success: "#35823D",
  card: "#16711F",
  default: "#494949",
};

export default Variants;
