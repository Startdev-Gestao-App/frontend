import { useMemo, useState } from "react";
import { getUsers } from "./functions/getUsers";
import { removeUser } from "./functions/removerUser";
import { Flex, SessionBtns, SessionPaginator } from "./styles";
import ModalDelete from "./components/modelDelete";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Title,
  Button,
  Loading,
  Alert,
  Pagination,
} from "../../components";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(20);
  const [remove, setRemove] = useState(false);
  const [id, setId] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useMemo(() => {
    getUsers(skip, take, setLoading, setData, setError);
  }, [skip, take]);

  const openRemove = (id) => {
    setId(id);
    setRemove(true);
  };

  const openEdit = (id) => {
    navigate("/users/data", { state: { id } });
  };

  const refresh = () => {
    getUsers(skip, take, setLoading, setData, setError);
  };

  const confirm = () => {
    removeUser(id, setLoading, setError, setSuccess, refresh, setRemove);
  };

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

  return (
    <>
      <Menu>
        <div className="container">
          <div className="row">
            <div className="col">
              <Title>Usuários</Title>
            </div>
            <div className="col col-lg-2">
              <Button
                label="Adicionar"
                variant="btn-primary"
                onClick={() => navigate("/users/data")}
              />
            </div>
          </div>
          <div style={{ marginTop: "40px" }} />
          <div className="row">
            <div className="col">
              {loading && <Loading />}
              {!loading && (
                <>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin</th>
                        <th scope="col">ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.users?.length
                        ? data.users.map((data, i) => (
                            <tr key={i}>
                              <th>{data.id}</th>
                              <th>{data.name}</th>
                              <th>{data.email}</th>
                              <th>{data.admin ? "Sim" : "Não"}</th>
                              <th>
                                <Flex>
                                  <SessionBtns>
                                    <Button
                                      onClick={() => openEdit(data.id)}
                                      label={<i className="bi bi-pencil"></i>}
                                      variant="btn-success"
                                    />
                                  </SessionBtns>
                                  <div style={{ marginLeft: "10px" }} />
                                  <SessionBtns>
                                    <Button
                                      onClick={() => openRemove(data.id)}
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
          </div>
        </div>
      </Menu>
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
          confirm={() => confirm()}
        />
      )}
    </>
  );
};

export default Users;
