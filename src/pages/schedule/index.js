import CardWeek from "./components/cardWeek";
import { useMemo, useState } from "react";
import { getWeek } from "./functions/getWeek";
import ModalCreate from "./components/modalCreate";
import { Menu, Title, Button, Select, Alert, Loading } from "../../components";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [create, setCreate] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const varifyMonth =
      String(month).length === 1 ? "0" + String(month) : String(month);

    setMonth(varifyMonth);
    setYear(String(year));

    setDate(`${varifyMonth}-${String(year)}`);
  }, []);

  useMemo(() => {
    if (date) {
      getWeek(date, setLoading, setError, setData);
    }
  }, [date]);

  const filterWeek = () => {
    const dateFilter = month + "-" + year;
    getWeek(dateFilter, setLoading, setError, setData);
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

  const redirecDay = (id) => {
    navigate("/days", { state: { id } });
  };

  return (
    <>
      <Menu>
        <div className="container">
          <div className="row">
            <div className="col">
              <Title>Programação</Title>
            </div>
            <div className="col col-lg-2">
              <Button
                label="Adicionar"
                s
                variant="btn-primary"
                onClick={() => setCreate(true)}
              />
            </div>
          </div>
          <div style={{ marginTop: "40px" }} />
          <div className="row">
            <div className="col col-lg-4">
              <Select
                label="Filtrar Mês"
                value={month}
                onChange={(ev) => setMonth(ev.target.value)}
              >
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </Select>
            </div>
            <div className="col col-lg-4">
              <Select
                label="Ano"
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
              >
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </Select>
            </div>
            <div className="col col-lg-2" style={{ marginTop: "30px" }}>
              <Button
                label="Filtrar"
                variant="btn-primary"
                onClick={() => filterWeek()}
              />
            </div>
          </div>
          <div style={{ marginTop: "40px" }} />
          <div className="row">
            {loading && <Loading />}
            {data.length && !loading
              ? data.map((data, i) => (
                  <div
                    key={i}
                    className="col col-lg-4"
                    style={{ marginTop: "40px" }}
                  >
                    <CardWeek
                      name={data.name}
                      priority={data.priority}
                      type={data.type}
                      onClick={() => redirecDay(data.id)}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </Menu>
      {create && (
        <ModalCreate
          open={create}
          close={() => setCreate(false)}
          setSuccess={setSuccess}
          setError={setError}
        />
      )}
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
    </>
  );
};

export default Schedule;
