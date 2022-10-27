import { Menu, Loading, Alert } from "../../components";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getDays } from "./functions/getDays";
import CardDay from "./components/cardDay";
import InfoDay from "../infoDay";

const Days = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [view, setView] = useState(false);
  const [id, setId] = useState(null);

  const location = useLocation();

  useMemo(() => {
    if (location?.state?.id) {
      getDays(location.state.id, setLoading, setError, setData);
    }
  }, []);

  const viewDay = (id) => {
    setId(id);
    setView(true);
  };

  return (
    <>
      <Menu>
        {!view && (
          <div className="container">
            <div style={{ marginTop: "40px" }} />
            <div className="row">
              {loading && (
                <div className="col">
                  <Loading />
                </div>
              )}
              {data.length && !loading
                ? data.map((data, i) => (
                    <div
                      className="col col-lg-3"
                      style={{ marginTop: "40px" }}
                      key={id}
                    >
                      <CardDay
                        name={data.name}
                        day={data.day}
                        avatar={data.user?.avatar}
                        status={data.status}
                        content={data.content}
                        onClick={() => viewDay(data.id)}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
        {view && <InfoDay id={id} setView={setView} />}
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

export default Days;
