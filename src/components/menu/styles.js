import styled from "styled-components";

export const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background-color: #000;
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 300px;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(220, 220, 220, 1);
`;

export const Content = styled.div`
  margin-top: 100px;
  margin-left: 320px;
  margin-right: 20px;
  background-color: #fff;
  padding: 25px;
  box-shadow: 0px 0px 5px 0px rgba(220, 220, 220, 1);
`;

export const Exit = styled.div`
  display: flex;
  margin-right: 20px;
  cursor: pointer;
`;

export const Icon = styled.i`
  margin-right: 5px;
`;

export const Option = styled.div`
  display: flex;
  padding: 15px;
  color: #fff;
  cursor: pointer;
  padding-bottom: 9px;

  &:hover {
    background-color: #a9a9a917;
  }
`;

export const IconMenu = styled.i`
  color: inherit;
  font-size: 20px;
  margin-right: 5px;
`;

export const Text = styled.p`
  color: inherit;
  padding-top: 5px;
`;

export const Logo = styled.img`
  width: 190px;
  display: flex;
  margin: 0 auto;
  padding: 20px 0;
`;
