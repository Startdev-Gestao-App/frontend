import { Button, Alert, Loading, Pagination } from "../../components";
import { getVideos } from "./functions/getVideos";
import { useMemo, useState } from "react";
import { Flex, SessionBtns, SessionPaginator } from "./styles";
import ModalDelete from "./components/modelDelete";
import { removeVideo } from "./functions/removeVideo";
import axios from "axios";
import ModalUpload from "./components/modalUpload";

const Video = ({ id, setView }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(20);
  const [, setPage] = useState(1);
  const [idVideo, setIdVideo] = useState(false);
  const [remove, setRemove] = useState(false);
  const [success, setSuccess] = useState(false);
  const [upload, setUpload] = useState(false);

  useMemo(() => {
    if (id) getVideos(setLoading, setData, setError, skip, take, id);
    // eslint-disable-next-line
  }, [id]);

  const refresh = () => {
    if (id) getVideos(setLoading, setData, setError, skip, take, id);
  };

  useMemo(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }

    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [error, success]);

  const deleteVideo = (id) => {
    setIdVideo(id);
    setRemove(true);
  };

  const confirmRemove = () => {
    removeVideo(setLoading, setSuccess, setError, idVideo, setRemove, refresh);
  };

  const donwloadFile = async (file, name) => {
    window.open(
      `https://api-gestao.startdevjs.com.br${file}`,
      "_blank" // <- This is what makes it open in a new window.
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Button
              label="Voltar"
              variant="btn-secondary"
              onClick={() => setView(false)}
            />
          </div>
          <div className="col-lg-2">
            <Button
              label="Enviar"
              variant="btn-primary"
              onClick={() => setUpload(true)}
            />
          </div>
        </div>
        <div style={{ marginTop: "40px" }} />
        {loading && <Loading />}
        {!loading && (
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" style={{ width: "85%" }}>
                    Nome
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.videos?.length
                  ? data.videos.map((data, i) => (
                      <tr key={i} style={{ cursor: "pointer" }}>
                        <th>{data.id}</th>
                        <th>{data.name}</th>
                        <th>
                          <Flex>
                            <SessionBtns>
                              <Button
                                onClick={() =>
                                  donwloadFile(data.link, data.nameFile)
                                }
                                label={<i className="bi bi-download"></i>}
                                variant="btn-primary"
                              />
                            </SessionBtns>
                            <div style={{ marginLeft: "10px" }} />
                            <SessionBtns>
                              <Button
                                onClick={() => deleteVideo(data.id)}
                                label={<i className="bi bi-trash"></i>}
                                variant="btn-danger"
                              />
                            </SessionBtns>
                          </Flex>
                        </th>
                      </tr>
                    ))
                  : false}
              </tbody>
            </table>
            <SessionPaginator>
              <Pagination
                totalPage={data?.totalPage}
                setPage={setPage}
                setSkip={setSkip}
                setTake={setTake}
              />
            </SessionPaginator>
          </>
        )}
      </div>
      {error && (
        <Alert
          message="Não foi possível realizar a operação"
          variant="alert-danger"
        />
      )}
      {success && (
        <Alert
          message="Operação realizada com sucesso!"
          variant="alert-primary"
        />
      )}
      {remove && (
        <ModalDelete
          open={remove}
          close={() => setRemove(false)}
          confirm={() => confirmRemove()}
        />
      )}
      {upload && (
        <ModalUpload
          categoryId={id}
          open={upload}
          close={() => setUpload(false)}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default Video;
