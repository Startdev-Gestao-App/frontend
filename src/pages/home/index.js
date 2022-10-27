import { Menu, Loading } from "../../components";
import api from "../../services/api";
import { useState, useMemo } from "react";
import { CardInfoDisk, Flex } from "./styles";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const getInfos = async () => {
    setLoading(true);

    try {
      const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

      const response = await api.get(`/infos`, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      setData(response.data);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  useMemo(() => {
    getInfos();
  }, []);

  useMemo(() => {
    console.log(data);
  }, [data]);

  return (
    <Menu>
      {loading && <Loading />}
      {!loading && (
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h5>Armazenamento</h5>
              <CardInfoDisk>
                <Flex>
                  Total Armazenamento:
                  <strong style={{ marginLeft: "5px" }}>{data?.total}</strong>
                </Flex>
                <div
                  style={{
                    borderBottom: "1px solid #0d6efd",
                    width: "100%",
                    marginBottom: "15px",
                  }}
                />
                <Flex>
                  Usado:
                  <strong style={{ marginLeft: "5px" }}>{data?.used}</strong>
                </Flex>
                <div
                  style={{
                    borderBottom: "1px solid #198754",
                    width: "100%",
                    marginBottom: "15px",
                  }}
                />
                <Flex>
                  Disponível:
                  <strong style={{ marginLeft: "5px" }}>{data?.free}</strong>
                </Flex>
                <div
                  style={{
                    borderBottom: "1px solid #fd7e14",
                    width: "100%",
                    marginBottom: "15px",
                  }}
                />
              </CardInfoDisk>
            </div>
          </div>
        </div>
      )}
    </Menu>
  );
};

export default Home;
