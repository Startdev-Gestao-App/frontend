import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
`;

export const SessionBtns = styled.div`
  width: 50px;
`;

export const SessionPaginator = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CardCategory = styled.div`
  padding: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #dcdcdc;
  }
`;
