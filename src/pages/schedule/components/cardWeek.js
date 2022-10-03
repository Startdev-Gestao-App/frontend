import { Body, NameWeek, Priority, Flex } from "./styles";

const CardWeek = ({ name, priority, type, onClick }) => {
  return (
    <Body onClick={onClick}>
      <NameWeek>{name}</NameWeek>
      <Flex>
        <span style={{ paddingRight: "10px" }}>Prioridade:</span>
        <Priority priority={priority}>{priority}</Priority>
      </Flex>
      <p style={{ fontWeight: "bold", paddingTop: "15px" }}>Tipo: {type}</p>
    </Body>
  );
};

export default CardWeek;
