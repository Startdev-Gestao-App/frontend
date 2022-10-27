import { useNavigate } from "react-router-dom";
import ImgLogo from "../../assets/logo2.png";
import {
  Menu,
  Header,
  Content,
  Exit,
  Icon,
  Logo,
  Option,
  IconMenu,
  Text,
} from "./styles";

const MenuComponent = ({ children }) => {
  const navigate = useNavigate();

  const exit = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Menu>
        <Logo src={ImgLogo} />
        <Option onClick={() => navigate("/")}>
          <IconMenu className="bi bi-house-door"></IconMenu>
          <Text>Dashboard</Text>
        </Option>
        <Option onClick={() => navigate("/schedule")}>
          <IconMenu className="bi bi-calendar-date"></IconMenu>
          <Text>Programação</Text>
        </Option>
        <Option onClick={() => navigate("/videos")}>
          <IconMenu className="bi bi-camera-reels"></IconMenu>
          <Text>Vídeos</Text>
        </Option>
        <Option onClick={() => navigate("/users")}>
          <IconMenu className="bi bi-person"></IconMenu>
          <Text>Usuários</Text>
        </Option>
      </Menu>
      <Header>
        <Exit onClick={() => exit()}>
          <Icon className="bi bi-box-arrow-left"></Icon>Sair
        </Exit>
      </Header>
      <Content>{children}</Content>
    </>
  );
};

export default MenuComponent;
