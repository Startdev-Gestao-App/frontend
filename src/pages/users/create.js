import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveUser } from "./functions/saveUser";
import { getUserById } from "./functions/getUserById";
import { editUser } from "./functions/editUser";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Title,
  Input,
  Button,
  Loading,
  ErrorMessage,
  Alert,
} from "../../components";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const schema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Mínimo 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const redirect = () => {
    setTimeout(() => {
      navigate("/users");
    }, 2000);
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

  const save = (data) => {
    saveUser(setLoading, setSuccess, setError, redirect, data);
  };

  const edit = (data) => {
    delete data.password;
    editUser(
      location.state.id,
      setLoading,
      setError,
      setSuccess,
      redirect,
      data
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getUserById(location.state.id, setLoading, setError, setValue);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Menu>
        <Title>Criar Usuário</Title>
        <div style={{ marginTop: "50px" }} />
        {loading && <Loading />}
        {!loading && (
          <form onSubmit={handleSubmit(location?.state?.id ? edit : save)}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <Input
                    label="Nome"
                    placeholder="Digite o nome do usuário"
                    {...register("name")}
                  />
                  {errors?.name && (
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                  )}
                </div>
                <div className="col-lg-4">
                  <Input
                    label="E-mail"
                    placeholder="Digite o e-mail do usuário"
                    {...register("email")}
                  />
                  {errors?.email && (
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  )}
                </div>
                <div className="col-lg-4">
                  <Input
                    label="Senha"
                    placeholder="Digite a senha do usuário"
                    type="password"
                    {...register("password")}
                  />
                  {errors?.password && (
                    <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                  )}
                </div>
                <div style={{ marginTop: "50px" }} />
                <div className="col">
                  <div className="row" style={{ justifyContent: "flex-end" }}>
                    <div className="col-lg-2">
                      <Button
                        label="Cancelar"
                        variant="btn-danger"
                        type="button"
                        onClick={() => navigate("/users")}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Button
                        label="Salvar"
                        variant="btn-primary"
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
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
    </>
  );
};

export default Create;
