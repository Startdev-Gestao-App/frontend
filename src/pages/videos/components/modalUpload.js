import { useState } from "react";
import Modal from "react-modal";
import { Body, SessionBtns } from "./styles";
import { Button, Input } from "../../../components";
import api from "../../../services/api";

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

const ModalDelete = ({ open, close, categoryId, refresh }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const uploadFile = async () => {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("categoryId", categoryId);
      data.append("file", file);

      const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

      await api.post("/video", data, {
        onUploadProgress: (event) => {
          let progress = Math.round(event.loaded * 100) / event.total;
          setProgress(progress);
        },
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      refresh();
      close();
    } catch (e) {
      setError(true);
    }
  };

  const saveFile = (ev) => {
    setFile(ev.files[0]);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Body>
        <h3>Enviar Vídeo</h3>
        {error && (
          <p style={{ color: "red" }}>
            Não foi possível enviar o vídeo, tente novamente
          </p>
        )}
        <hr />
        <Input
          label="Nome do Arquivo"
          placeholder="Digite o nome do arquivo"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <div style={{ marginTop: "20px" }} />
        <Input
          type="file"
          label="Arquivo"
          onChange={(ev) => saveFile(ev.target)}
        />

        {progress > 0 && (
          <div class="progress" style={{ marginTop: "5px" }}>
            <div
              class="progress-bar"
              role="progressbar"
              aria-label="Example with label"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}%
            </div>
          </div>
        )}
        <SessionBtns>
          <Button
            label="Cancelar"
            variant="btn-secondary"
            onClick={() => close()}
          />
          <div style={{ marginLeft: "10px" }} />
          <Button
            label="Confirmar"
            variant="btn-primary"
            onClick={() => uploadFile()}
          />
        </SessionBtns>
      </Body>
    </Modal>
  );
};

export default ModalDelete;
