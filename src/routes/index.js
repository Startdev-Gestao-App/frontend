import React from "react";
import { Routes, Route } from "react-router-dom";
import Private from "./private";
import Login from "../pages/login";
import Home from "../pages/home";
import Users from "../pages/users";
import DataUser from "../pages/users/create";
import Schedule from "../pages/schedule";
import Days from "../pages/days";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Private Component={Home} />} />
      <Route path="/users" element={<Private Component={Users} />} />
      <Route path="/users/data" element={<Private Component={DataUser} />} />
      <Route path="/schedule" element={<Private Component={Schedule} />} />
      <Route path="/days" element={<Private Component={Days} />} />
    </Routes>
  );
};

export default RoutesComponent;
