import Modal from "react-modal";
import { BodyModal, SessionBtns } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createWeek } from "../functions/createWeek";
import { useState } from "react";
import { Button, Loading, Select, ErrorMessage } from "../../../components";

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

const ModalCreate = ({ open, close, setSuccess, setError }) => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    month: yup.string().required("Campo obrigatório"),
    year: yup.string().required("Campo obrigatório"),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const returnTotalDays = async (mes, ano) => {
    const data = await new Date(ano, mes, 0);
    return data.getDate();
  };

  const save = async (data) => {
    const totalDays = await returnTotalDays(data.month, data.year);
    const totalWeek = totalDays / 7;
    const roundWeek = Math.ceil(totalWeek);

    const verifyMonth =
      String(data.month).length === 1
        ? "0" + String(data.month)
        : String(data.month);

    let array = [];

    for (let i = 1; i <= roundWeek; i++) {
      array.push({
        name: `Semana ${i}`,
        date: `${verifyMonth}-${data.year}`,
        priority: "baixa",
        type: "normal",
      });
    }

    createWeek(array, setLoading, setSuccess, setError, close);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <BodyModal>
          <h3>Criar Semanas no mês</h3>
          <hr />
          {loading && <Loading />}
          {!loading && (
            <form onSubmit={handleSubmit(save)}>
              <div style={{ marginTop: "40px" }} />
              <Controller
                control={control}
                name={"month"}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    label="Mês"
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
                )}
              />
              {errors?.month && (
                <ErrorMessage>{errors?.month?.message}</ErrorMessage>
              )}
              <div style={{ marginTop: "40px" }} />
              <Controller
                control={control}
                name={"year"}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    label="Ano"
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
                )}
              />
              {errors?.year && (
                <ErrorMessage>{errors?.year?.message}</ErrorMessage>
              )}
              <SessionBtns>
                <Button
                  label="Cancelar"
                  variant="btn-danger"
                  type="button"
                  onClick={() => close()}
                />
                <div style={{ marginLeft: "10px" }} />
                <Button label="Confirmar" variant="btn-primary" type="submit" />
              </SessionBtns>
            </form>
          )}
        </BodyModal>
      </Modal>
    </>
  );
};

export default ModalCreate;
