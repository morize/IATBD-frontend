import styled from "styled-components";
import Modal, { ModalProps } from "@material-ui/core/Modal";

const StModal = styled(Modal)`
  font-family: "Fira Sans", sans-serif;
`;

interface IModalComponent extends ModalProps {}

const ModalComponent = ({ ...rest }: IModalComponent) => {
  return <StModal {...rest} />;
};

export default ModalComponent;
