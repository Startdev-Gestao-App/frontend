import styled from "styled-components";

export const Body = styled.div`
  border: 1px solid #dcdcdc;
  padding: 15px;
  border-top: 4px solid #005dff;
  border-radius: 5px;
  cursor: pointer;
`;

export const NameWeek = styled.p`
  font-weight: bold;
`;

export const Priority = styled.div`
  color: #000;
  width: 70px;
  text-align: center;
  border-radius: 6px;
  ${({ priority }) =>
    priority === "baixa" &&
    `
    background: #1fbd2e59;
  `}

  ${({ priority }) =>
    priority === "media" &&
    `
    background: #d8d63e59;
  `}

${({ priority }) =>
    priority === "alta" &&
    `
    background: #df444459;
  `}
`;

export const Flex = styled.div`
  display: flex;
`;

export const BodyModal = styled.div`
  padding: 20px;
  width: 500px;
`;

export const SessionBtns = styled.div`
  display: flex;
  width: 150px;
  margin-top: 40px;
`;
