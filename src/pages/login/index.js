import { Main, Body, Logo, Space } from "./styles";
import { Input, Button, Alert, Loading } from "../../components";
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import ImgLogo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const requestLogin = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    if (email && password) {
      try {
        const data = { email, password };
        const response = await api.post("/login", data);

        if (response?.data?.token) {
          api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
          setLoading(false);

          const object = {
            logged: true,
            id: response.data.decode.id,
            name: response.data.decode.name,
            email: response.data.decode.email,
            token: response.data.token,
          };

          localStorage.setItem("gestao-app-finance", JSON.stringify(object));
          navigate("/");
        } else {
          throw new Error("Usuário inválido");
        }
      } catch (e) {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, [3000]);
      }
    }
  };

  return (
    <>
      <Main>
        <Body>
          {loading && <Loading />}
          {!loading && (
            <form onSubmit={requestLogin}>
              <Logo src={ImgLogo} /> <br />
              <Input
                placeholder="Digite seu e-mail"
                label="E-mail"
                value={email}
                required={true}
                minLength="5"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Space />
              <Input
                placeholder="Digite sua senha"
                type="password"
                label="Senha"
                value={password}
                required={true}
                minLength="6"
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <Space />
              <Button variant={"btn-primary"} label="Entrar" />
            </form>
          )}
        </Body>
      </Main>
      {error && (
        <Alert variant="alert-danger" message="Usuário e/ou senha incorretos" />
      )}
    </>
  );
};

export default Login;
