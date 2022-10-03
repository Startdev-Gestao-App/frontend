import Modal from "react-modal";
import { Body, SessionBtns } from "./styles";
import { Button } from "../../../components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalDelete = ({ open, close, confirm }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Body>
        <h3>Remover Usuário</h3>
        <hr />
        <p>Você tem certeza que deseja remover esse usuário? </p>
        <p>
          <strong>Essa ação não poderá ser desfeita!</strong>
        </p>
        <SessionBtns>
          <Button
            label="Cancelar"
            variant="btn-secondary"
            onClick={() => close()}
          />
          <div style={{ marginLeft: "10px" }} />
          <Button
            label="Confirmar"
            variant="btn-danger"
            onClick={() => confirm()}
          />
        </SessionBtns>
      </Body>
    </Modal>
  );
};

export default ModalDelete;
