import styled from "styled-components";

export const Body = styled.div`
  border: 1px solid #dcdcdc;
  padding: 15px;
  border-top: ${(props) =>
    props.color ? ` 4px solid ${props.color}` : "4px solid #005dff"};
  border-radius: 5px;
  cursor: pointer;
`;

export const Name = styled.p`
  font-weight: bold;
`;

export const Day = styled.p``;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: -66px;
`;

export const Status = styled.div`
  background-color: ${(props) => (props.color ? props.color : "#dcdcdc")};
  font-size: 14px;
  width: 120px;
  text-align: center;
  border-radius: 8px;
  color: #fff;
`;

export const Content = styled.div`
  background-color: ${(props) => (props.color ? props.color : "#dcdcdc")};
  font-size: 14px;
  width: 120px;
  text-align: center;
  border-radius: 8px;
  margin-top: 10px;
  color: #fff;
`;
