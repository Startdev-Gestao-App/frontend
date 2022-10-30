import { Body, Name, Day, Right, Avatar, Status, Content } from "./styles";

const CardDay = ({ name, day, avatar, status, content, onClick }) => {
  const returnStatus = (status) => {
    if (status === 1) return "Em branco";
    if (status === 2) return "Prod Texto";
    if (status === 3) return "Prod Reels";
    if (status === 4) return "Prod Aula";
    if (status === 5) return "Prod Image";
    if (status === 6) return "Agendado";
  };

  const returnColorStatus = (status) => {
    if (status === 1) return "#FF00FF";
    if (status === 2) return "#8A2BE2";
    if (status === 3) return "#00BFFF";
    if (status === 4) return "#FFA500";
    if (status === 5) return "#CD5C5C";
    if (status === 6) return "#2E8B57";
  };

  const returnContent = (status) => {
    if (status === 1) return "Em branco";
    if (status === 2) return "Estático";
    if (status === 3) return "Corressel";
    if (status === 4) return "Tweet";
    if (status === 5) return "Reels";
  };

  const renderColorContent = (day) => {
    if (day === 1) return "#2E8B57";
    if (day === 2) return "#6A5ACD";
    if (day === 3) return "#CD5C5C";
    if (day === 4) return "#2F4F4F";
    if (day === 5) return "#BDB76B";
  };

  return (
    <Body color="#dcdcdc" onClick={onClick}>
      <Name>{name}</Name>
      <Day>Dia: {day}</Day>
      <Right>
        {avatar && (
          <Avatar src={`https://api-gestao.startdevjs.com.br${avatar}`} />
        )}
      </Right>
      <Status color={returnColorStatus(status)}>{returnStatus(status)}</Status>
      <Content color={renderColorContent(content)}>{`Tipo: ${returnContent(
        content
      )}`}</Content>
    </Body>
  );
};

export default CardDay;
