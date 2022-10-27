import { useState, useMemo } from "react";
import { getVideos } from "./functions/getCategory";
import { Menu, Title, Button, Loading, Alert } from "../../components";
import { CardCategory } from "./styles";
import Video from "./video";

const Videos = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [view, setView] = useState(false);
  const [id, setId] = useState(null);

  useMemo(() => {
    getVideos(setLoading, setData, setError);
  }, []);

  useMemo(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  const viewVideo = (id) => {
    setId(id);
    setView(true);
  };

  return (
    <>
      <Menu>
        <div className="container">
          {!view && (
            <div className="row">
              <div className="col">
                <Title>Vídeos</Title>
              </div>
            </div>
          )}
          {!view && <div style={{ marginTop: "40px" }} />}
          <div className="row">
            <div className="col">
              {loading && <Loading />}
              {!loading && !view && data?.length
                ? data.map((data, i) => (
                    <CardCategory key={i} onClick={() => viewVideo(data.id)}>
                      {data.name}
                    </CardCategory>
                  ))
                : null}
              {view && <Video id={id} setView={setView} />}
            </div>
          </div>
        </div>
      </Menu>
      {error && (
        <Alert
          message="Não foi possível realizar a operação"
          variant="alert-danger"
        />
      )}
    </>
  );
};

export default Videos;
