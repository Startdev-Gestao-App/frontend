import { useMemo, useState } from "react";
import { getInfoDay } from "./functions/getInfoDay";
import { Loading, Alert, Select, Input, Button } from "../../components";
import { Title } from "./styles";
import { getUsers } from "./functions/getUsers";
import { deleteAttachment } from "./functions/deleteAttachment";
import api from "../../services/api";
import axios from "axios";
import { deleteVideo } from "./functions/deleteVideo";

const InfoDay = ({ id, setView }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);
  const [content, setContent] = useState(null);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [nameVideo, setNameVideo] = useState(null);
  const [progressVideo, setProgressVideo] = useState(0);

  const refresh = () => {
    getInfoDay(id, setData, setLoading, setError);
    setProgress(0);
    setProgressVideo(0);
  };

  useMemo(() => {
    if (id) {
      getInfoDay(id, setData, setLoading, setError);
      getUsers(0, 100, setLoading, setUsers, setError);
    }
  }, [id]);

  useMemo(() => {
    if (data) {
      setUserId(data.userId);
      setStatus(data.status);
      setContent(data.content);
      setText(data.description);
    }
  }, [data]);

  useMemo(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }

    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [success, error]);

  const uploadFile = async (ev) => {
    try {
      const data = new FormData();
      data.append("name", fileName);
      data.append("dayId", id);
      data.append("file", ev.files[0]);

      const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

      await api.post("/attachment", data, {
        onUploadProgress: (event) => {
          let progress = Math.round(event.loaded * 100) / event.total;
          setProgress(progress);
        },
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      refresh();
    } catch (e) {
      setError(true);
    }
  };

  const uploadVideo = async (ev) => {
    try {
      const data = new FormData();
      data.append("name", nameVideo);
      data.append("dayId", id);
      data.append("file", ev.files[0]);

      const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

      await api.post("/video", data, {
        onUploadProgress: (event) => {
          let progress = Math.round(event.loaded * 100) / event.total;
          setProgressVideo(progress);
        },
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      refresh();
    } catch (e) {
      setError(true);
    }
  };

  const donwloadFile = async (file, name) => {
    axios({
      url: `https://api-gestao.startdevjs.com.br${file}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(file);
    });
  };

  const saveDay = async () => {
    setLoading(true);

    try {
      const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

      const data = {
        userId: Number(userId),
        status: Number(status),
        content: Number(content),
        description: text,
      };

      await api.put(`/day/${id}`, data, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      setLoading(false);
      setSuccess(true);
      refresh();
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && data && (
        <>
          <Button
            label="Voltar"
            variant="btn-secondary"
            onClick={() => setView(false)}
            style={{ width: "80px", marginBottom: "20px" }}
          />
          <div className="container">
            <div className="row">
              <div className="col col-lg-8">
                <div className="row">
                  <div className="col col-lg-10">
                    <Title>
                      Dia: {data.day} - {data.name}
                    </Title>
                  </div>
                  <div className="col col-lg-2" style={{ marginTop: "10px" }}>
                    <Button
                      label="Salvar"
                      variant="btn-primary"
                      onClick={() => saveDay()}
                    />
                  </div>
                </div>
                <div className="col">
                  <textarea
                    className="form-control"
                    style={{ height: "500px" }}
                    value={text}
                    onChange={(ev) => setText(ev.target.value)}
                  />
                </div>
                <div className="col-lg-12" style={{ paddingTop: "15px" }}>
                  <Input
                    label="Nome do Vídeo"
                    onChange={(ev) => setNameVideo(ev.target.value)}
                    placeholder="Digite o nome do arquivo"
                  />
                  <div style={{ marginTop: "20px" }} />
                  <Input
                    type="file"
                    label="Enviar Vídeo"
                    onChange={(ev) => uploadVideo(ev.target)}
                  />
                  <div class="progress" style={{ marginTop: "5px" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-label="Example with label"
                      style={{ width: `${progressVideo}%` }}
                      aria-valuenow={progressVideo}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {progressVideo}%
                    </div>
                  </div>
                  <div className="col" style={{ paddingTop: "15px" }}>
                    <p>Vídeos:</p>

                    {data?.Video?.length
                      ? data.Video.map((data, i) => (
                          <div
                            style={{
                              display: "flex",
                              cursor: "pointer",
                              marginBottom: "15px",
                            }}
                          >
                            <p
                              className="link-primary"
                              onClick={() =>
                                donwloadFile(data.link, data.nameFile)
                              }
                            >
                              {data.name}
                            </p>
                            <i
                              className="bi bi-trash link-primary"
                              style={{ marginLeft: "20px" }}
                              onClick={() =>
                                deleteVideo(
                                  data.id,
                                  setLoading,
                                  setSuccess,
                                  setError,
                                  refresh
                                )
                              }
                            ></i>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              <div className="col col-lg-4" style={{ paddingTop: "55px" }}>
                <div className="col">
                  <Select
                    label="Responsável"
                    value={userId}
                    onChange={(ev) => setUserId(ev.target.value)}
                  >
                    <option value={null}>Selecione </option>
                    {users?.length
                      ? users.map((data, i) => (
                          <option key={i} value={data.id}>
                            {data.name}
                          </option>
                        ))
                      : null}
                  </Select>
                </div>
                <div className="col" style={{ marginTop: "20px" }}>
                  <Select
                    label="Status"
                    value={status}
                    onChange={(ev) => setStatus(ev.target.value)}
                  >
                    <option value={1}>Em Branco</option>
                    <option value={2}>Prod Texto</option>
                    <option value={3}>Prod Reels</option>
                    <option value={4}>Prod Aula</option>
                    <option value={5}>Prod Imagem</option>
                    <option value={6}>Agendado</option>
                  </Select>
                </div>
                <div className="col" style={{ marginTop: "20px" }}>
                  <Select
                    label="Tipo de Conteúdo"
                    value={content}
                    onChange={(ev) => setContent(ev.target.value)}
                  >
                    <option value={1}>Em Branco</option>
                    <option value={2}>Estático</option>
                    <option value={3}>Carrossel</option>
                    <option value={4}>Tweet</option>
                    <option value={5}>Reels</option>
                  </Select>
                </div>
                <div className="col" style={{ marginTop: "90px" }}>
                  <Input
                    label="Nome do Arquivo"
                    type="text"
                    value={fileName}
                    onChange={(ev) => setFileName(ev.target.value)}
                  />
                  <div style={{ marginTop: "5px" }} />
                  <Input
                    label="Enviar Arquivo"
                    type="file"
                    onChange={(ev) => uploadFile(ev.target)}
                  />
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
                </div>
                <div className="col" style={{ paddingTop: "15px" }}>
                  <p>Arquivos:</p>

                  {data?.Attachments?.length
                    ? data.Attachments.map((data, i) => (
                        <div
                          style={{
                            display: "flex",
                            cursor: "pointer",
                            marginBottom: "15px",
                          }}
                        >
                          <p
                            className="link-primary"
                            onClick={() => donwloadFile(data.file, data.name)}
                          >
                            {data.name}
                          </p>
                          <i
                            className="bi bi-trash link-primary"
                            style={{ marginLeft: "20px" }}
                            onClick={() =>
                              deleteAttachment(
                                data.id,
                                setLoading,
                                setSuccess,
                                setError,
                                refresh
                              )
                            }
                          ></i>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {error && (
        <Alert
          message="Não foi possível realizar a operação"
          variant="alert-danger"
        />
      )}
      {success && (
        <Alert
          message="Operação realizada com sucesso"
          variant="alert-primary"
        />
      )}
    </>
  );
};

export default InfoDay;
